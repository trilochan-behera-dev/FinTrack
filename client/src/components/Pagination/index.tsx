export default function Pagination({ pagination, setPagination, tableData, numberOfPages }: any) {

    return (
        <>
            <p className={`cursor-pointer bg-black-2 h-6 w-6 rounded flex items-center justify-center ${pagination?.start <= 0 && "invisible"}`} onClick={() => setPagination({ ...pagination, start: pagination.start - numberOfPages, end: pagination.end - numberOfPages })}>{`<`}</p>
            <div className="flex  gap-2 items-center justify-center">
                {
                    tableData?.length ?
                        <input
                            type="text"
                            value={(pagination?.start / numberOfPages) + 1}
                            className="w-6 h-6 text-center text-boxdark-2"
                            onChange={(e) => setPagination({ ...pagination, start: (Number(e?.target?.value) * numberOfPages) - numberOfPages, end: (Number(e?.target?.value)) * numberOfPages })}
                        />
                        :
                        0
                }
                <p> / {Math.ceil(tableData?.length / numberOfPages)} </p>
                <p>Page</p>
            </div>
            <p className={`cursor-pointer bg-black-2 h-6 w-6 rounded flex items-center justify-center ${((pagination?.end >= tableData?.length) || (pagination?.start / numberOfPages) + 1 >= Math.ceil(tableData?.length / numberOfPages)) && "invisible"}`} onClick={() => setPagination({ ...pagination, start: pagination?.start + numberOfPages, end: pagination?.end + numberOfPages })}>{`>`}</p>
        </>
    )
}