export default function TouristPlace({places}) {
  return (
    <div className="p-6 grid grid-cols-5 gap-4">
        {places.map((place)=>(
            <div key={place.placeName} className="bg-neutral-50 shadow h-100 rounded overflow-hidden relative">
                <img src={place.img} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 min-h-30 bg-black/20 p-2 backdrop-blur-lg">
                    <p className="text-white text-lg font-black">{place.placeName}</p>
                    <p className="text-neutral-300 text-xs line-clamp-2">{place.desc}</p>
                    <strong className=" mt-2 text-neutral-100 inline-block">₹ {place.price}</strong>
                </div>
                <p className="absolute text-xl bg-black/50 backdrop-blur-lg top-2 right-2 rounded-full flex justify-center items-center h-10 w-10">{place.whenToVisit === "Winter" ? "❄️" : "🌞"}</p>
                <p className="absolute text-sm text-white font-medium backdrop-blur-xl border border-white/5 top-3 left-2 rounded flex justify-center items-center p-1">{place.price >=10000 ? "Expensive" : "Cheaper"}</p>
                {/* {place.placeName} */}
            </div>
        ))}
    </div>
  )
}
