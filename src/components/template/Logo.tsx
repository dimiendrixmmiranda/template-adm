export default function Logo() {
    return (
        <div className="bg-white w-10 h-10 rounded-full flex flex-col items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-red-600"></div>
            <div className="flex mt-1 gap-2">
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-600"></div>
            </div>
        </div>
    )
}