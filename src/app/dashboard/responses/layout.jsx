function ResponsesLayout({ children }) {
    return (
        <div className="h-full flex flex-col overflow-auto scrollbar-hide">
            <div className="pt-6">
                <h2 className='font-medium text-3xl mb-2'>Responses</h2>
                {children}
            </div>
        </div>
    )
}

export default ResponsesLayout
