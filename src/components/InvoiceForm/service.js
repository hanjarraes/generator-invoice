
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const GenerateInvoice = (mainState) => {
    html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
        const imgData = canvas.toDataURL('image/png', 1.0);
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: [612, 792]
        });
        pdf.internal.scaleFactor = 1;
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${mainState.invoiceNo}.pdf`);
    });
}

export const handleAddEvent = ({ items, setItems }) => {
    const id = items.length + 1;
    const newItem = {
        id: id,
        name: '',
        price: '1',
        description: '',
        quantity: 1
    };
    setItems([...items, newItem]);
}

export const handleRowDel = ({ items, setItems, item }) => {
    const updatedItems = items.filter(i => i.id !== item.id);
    setItems(updatedItems);
};

export const handleCalculateTotal = ({ mainState, setMainState, items }) => {
    const subTotalValue = items.reduce((acc, item) => {
        return acc + (parseFloat(item.price) * parseInt(item.quantity));
    }, 0);

    const subTotalFloat = parseFloat(subTotalValue);
    const taxAmountFloat = (subTotalFloat * (parseFloat(mainState.taxRate === '' ? '0.0' : mainState.taxRate) / 100));
    const discountAmountFloat = (subTotalFloat * (parseFloat(mainState.discountRate === '' ? '0.0' : mainState.discountRate) / 100));
    const totalFloat = (subTotalFloat - discountAmountFloat + parseFloat(taxAmountFloat));


    setMainState(prevState => ({
        ...prevState,
        subTotal: subTotalFloat.toLocaleString(),
        taxAmount: taxAmountFloat.toLocaleString(),
        discountAmount: discountAmountFloat.toLocaleString(),
        total: totalFloat.toLocaleString()
    }));
};

export const onCurrencyChange = ({ event, setMainState }) => {
    const selectedCurrency = JSON.parse(event.target.value);

    setMainState(prevState => ({
        ...prevState,
        invoice_currency_id: selectedCurrency.id,
        currency: selectedCurrency.currency
    }));
};

export const getRomanMonth = (month) => {
    if (month < 1 || month > 12) {
        throw new Error('Invalid month value. Month should be between 1 and 12.');
    }

    const romanNumerals = [
        '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'
    ];

    return romanNumerals[month];
};

export const formatInvoiceNumber = (value) => {
    const formattedInvoiceNumber = String(value).padStart(3, '0');
    const currentYear = new Date().getFullYear();
    const currentMonthRoman = getRomanMonth(new Date().getMonth() + 1);

    return `${formattedInvoiceNumber}/AN/${currentMonthRoman}/ALIV/${currentYear}`
}

export const editField = ({ event, setMainState, mainState, items }) => {
    const { name, value } = event.target;
    setMainState(prevState => ({
        ...prevState,
        [name]: value
    }));
    handleCalculateTotal({ mainState, setMainState, items });
};

export const onItemizedItemEdit = ({ evt, mainState, setMainState, items, setItems }) => {
    const { id, name, value } = evt.target;
    const newItems = items.map(item => {
        if (item.id === parseInt(id)) {
            return {
                ...item,
                [name]: value
            };
        }
        return item;
    });
    setItems(newItems);
    handleCalculateTotal({ mainState, setMainState, items });
};

export const formatPayload = ({ mainState, items }) => {
    const payload = {
        invoice_no: formatInvoiceNumber(mainState.invoiceNumber),
        billFrom: mainState.billFrom,
        billFromEmail: mainState.billFromEmail,
        billFromAddress: mainState.billFrom,
        status: mainState.status,
        current_date: mainState.currentDate,
        due_date: mainState.dateOfIssue,
        total: mainState.total,
        allInfo: {
            billFrom: mainState.billFrom,
            billFromAddress: mainState.billFromAddress,
            billFromEmail: mainState.billFromEmail,
            billTo: mainState.billTo,
            billToAddress: mainState.billToAddress,
            billToEmail: mainState.billToEmail,
            invoice_status_id: mainState.invoice_status_id,
            status: mainState.status,
            invoice_currency_id: mainState.invoice_currency_id,
            currency: mainState.currency,
            currentDate: mainState.currentDate,
            dateOfIssue: mainState.dateOfIssue,
            discountAmount: mainState.discountAmount || '0',
            discountRate: mainState.discountRate || '0',
            invoiceNo: formatInvoiceNumber(mainState.invoiceNumber),
            notes: mainState.notes,
            subTotal: mainState.subTotal,
            taxAmount: mainState.taxAmount,
            taxRate: mainState.taxRate,
            total: mainState.total,
            items: items.map(item => ({
                invoice_id: mainState.invoiceNumber,
                name: item.name,
                description: item.description,
                price: item.price,
                quantity: item.quantity,
            }))
        }
    };
    return payload
}

export const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const monthAbbreviation = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
    const year = date.getFullYear();

    return `${day} ${monthAbbreviation} ${year}`;
};
export const formatDateForm = (inputDate) => {
    const date = new Date(inputDate);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Ingat bahwa bulan dimulai dari 0
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
};

export const formatDateDefult = (inputDate) => {
    const date = new Date(inputDate);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Ingat bahwa bulan dimulai dari 0
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
};
