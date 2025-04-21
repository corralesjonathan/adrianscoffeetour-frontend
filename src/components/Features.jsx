import features from "../data/features.js"
export function Features() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
            {features.map((feature, index) => (
                <div
                    key={index}
                    className="bg-white mt-[160px] rounded-2xl shadow-md p-6 flex flex-col items-center text-center"
                >
                    <img src={feature.icon} alt="" />
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                </div>
            ))}
        </div>
    )

}