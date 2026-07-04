import {Prisma} from "@prisma/client";
import {CreateLedgerEntryDTO} from "../types/ledger.types";

export class LedgerRepository {
    async createEntries(
        tx: Prisma.TransactionClient,
        entries: CreateLedgerEntryDTO[]
    ) {
        return tx.ledgerEntry.createMany({
            data: entries
        });
    }
}