export function PageTitle( {page, title, text} ) {
    return (
        <div className="flex flex-col items-center justify-center w-[80vw] m-auto py-[40px] mt-[120px]">
            <h3 className="text-[48px] font-bold font-primary text-adrians-red">{page}</h3>
            <h2 className="text-[84px] font-bold font-primary text-adrians-brown">{title}</h2>
            <p className="text-[20px] font-regular text-adrians-brown">{text}</p>
        </div>
    )
}