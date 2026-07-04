import { describe, it, expect, vi, beforeEach } from "vitest";
import { Prisma } from "@prisma/client";

import { WalletService } from "../../../src/modules/wallet/services/wallet.service";
import { walletRepository } from "../../../src/modules/wallet/repositories/wallet.repository";
import { walletCache } from "../../../src/shared/cache/wallet.cache";
import { NotFoundError } from "../../../src/shared/errors/NotFoundError";

vi.mock(
    "../../../src/modules/wallet/repositories/wallet.repository",
    () => ({
        walletRepository: {
            findByUserId: vi.fn(),
            findUserLimit: vi.fn(),
            getWallerWithUser: vi.fn(),
            getLedger: vi.fn(),
        },
    })
);

vi.mock(
    "../../../src/shared/cache/wallet.cache",
    () => ({
        walletCache: {
            getBalance: vi.fn(),
            setBalance: vi.fn(),
        },
    })
);


const walletService = new WalletService();

beforeEach(() => {
    vi.clearAllMocks();
});


describe("WalletService", () => {

    it("should throw NotFoundError when wallet not found", async () => {

        vi.mocked(walletRepository.findByUserId)
            .mockResolvedValue(null);

        await expect(
            walletService.getBalance("user-1")
        ).rejects.toThrow(NotFoundError);

    });

    it("should return balance from redis", async () => {

    vi.mocked(walletRepository.findByUserId).mockResolvedValue({
        id: "wallet-1",
        currency: "IDR",
        balance: new Prisma.Decimal(100000),
    } as any);

    vi.mocked(walletCache.getBalance).mockResolvedValue("100000");

    const result = await walletService.getBalance("user-1");

    expect(result).toEqual({
        walletId: "wallet-1",
        currency: "IDR",
        balance: 100000,
        source: "redis",
    });

});

it("should return balance from database when cache miss", async () => {

    vi.mocked(walletRepository.findByUserId).mockResolvedValue({
        id: "wallet-1",
        currency: "IDR",
        balance: new Prisma.Decimal(100000),
    } as any);

    vi.mocked(walletCache.getBalance).mockResolvedValue(null);

    const result = await walletService.getBalance("user-1");

    expect(walletCache.setBalance)
        .toHaveBeenCalledWith(
            "wallet-1",
            "100000"
        );

    expect(result.source)
        .toBe("database");

});

it("should throw if wallet not found", async () => {

    vi.mocked(walletRepository.findByUserId)
        .mockResolvedValue(null);

    await expect(
        walletService.getBalance("user-1")
    ).rejects.toThrow(NotFoundError);

});

it("should return user limit", async () => {

    vi.mocked(walletRepository.findUserLimit)
        .mockResolvedValue({
            dailyLimit: 5000000,
            monthlyLimit: 50000000,
        } as any);

    const result =
        await walletService.getLimits("user-1");

    expect(result.dailyLimit)
        .toBe(5000000);

});

it("should throw if limit not found", async () => {

    vi.mocked(walletRepository.findUserLimit)
        .mockResolvedValue(null);

    await expect(
        walletService.getLimits("user-1")
    ).rejects.toThrow(NotFoundError);

});

it("should return ledger", async () => {

    vi.mocked(walletRepository.findByUserId)
        .mockResolvedValue({
            id: "wallet-1",
        } as any);

    vi.mocked(walletRepository.getLedger)
        .mockResolvedValue({
            items: [
                {
                    id: "ledger-1",
                },
            ],
            total: 1,
        });

    const result =
        await walletService.getLedger("user-1");

    expect(result.pagination.total)
        .toBe(1);

    expect(result.items.length)
        .toBe(1);

});

});

