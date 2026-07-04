export function transferSuccessTemplate(data: {

    receiver: string;

    amount: string;

    fee: string;

    referenceNumber: string;

}) {

    return `

        <h2>Transfer Successful</h2>

        <p>Receiver : ${data.receiver}</p>

        <p>Amount : ${data.amount}</p>

        <p>Fee : ${data.fee}</p>

        <p>Reference : ${data.referenceNumber}</p>

    `;

}