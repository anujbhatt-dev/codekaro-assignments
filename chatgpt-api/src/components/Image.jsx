import axios from "axios";
import { SendIcon } from "lucide-react";
import { useState } from "react";

export default function Image() {
  let [response, setResponse] = useState(""); 
  let [msg,setMsg] = useState("")
  let [loading,setLoading] = useState(false)
  const fetchResponse = async () =>{
    setLoading(true);
    const headers = {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
    }
    try {
        const {data} = await axios.post("https://api.openai.com/v1/images/generations", JSON.stringify({
             model: "gpt-image-1.5",
             prompt: msg,
             n:1,
             size:"1024x1024"
        }),{headers})
        console.log(data);   
        if(data){
            setResponse(`data:image/png;base64,${data.data[0].b64_json}`);
        }
    } catch (error) {
        console.log("something went wrong!", error);  
    } finally{
        setMsg("")
        setLoading(false);
    }
  }  
  
  return (
    <div>
        <main className="mx-auto w-full max-w-4xl px-4 pt-6 pb-32 sm:px-6 sm:pt-8 sm:pb-36">
            {
                loading ? 
                <div className="">
                        <div className="aspect-square w-full max-w-md animate-pulse rounded-2xl bg-zinc-800"/>
                </div>:
                <div>
                    {response!="" && <img className="aspect-square w-full max-w-md rounded-2xl object-cover" src={response} alt="AI-generated result" />}
                </div>
            }
        </main>
        <div className="fixed inset-x-0 bottom-0 bg-zinc-900/95 px-4 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur sm:px-6 sm:pb-6">
          <div className="mx-auto w-full max-w-4xl">
            <div className="flex items-center gap-2 rounded-3xl border border-zinc-500 bg-zinc-700 px-3 py-2">
                <input onChange={(e)=>setMsg(e.target.value)} value={msg} name="message" type="text" className="min-w-0 grow bg-transparent py-1 outline-none" placeholder="Generate an image"/>
                <button type="button" onClick={fetchResponse} aria-label="Generate image" className="shrink-0 rounded-full p-2 transition hover:bg-zinc-900/30 disabled:cursor-not-allowed disabled:opacity-50" disabled={loading || !msg.trim()}>
                  <SendIcon className="size-5"/>
                </button>
            </div>
            <p className="opacity-50 text-xs mt-2 text-center">AI generated response might be flawed!!</p>
          </div>
        </div>
    </div>
  )
}
