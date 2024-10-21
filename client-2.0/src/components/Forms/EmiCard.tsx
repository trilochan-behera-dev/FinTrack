function EmiCards({ emiList, onDelete, showDelete }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {emiList.map((emi, index) => (
                <div key={index} className="p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-xl font-bold mb-2">{emi.name}</h2>
                    <p className="text-sm text-gray-600">Company: {emi.companyName}</p>
                    <p className="text-sm text-gray-600">Installment Date: {emi.installmentDate}</p>
                    <p className="text-sm text-gray-600">Total Amount: {emi.totalAmount}</p>
                    <p className="text-sm text-gray-600">Next EMI Paid: {emi.isPaid ? 'Yes' : 'No'}</p>
                    {showDelete && (
                        <button 
                            onClick={() => onDelete(index)} 
                            className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none"
                        >
                            Delete
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}


export default EmiCards
