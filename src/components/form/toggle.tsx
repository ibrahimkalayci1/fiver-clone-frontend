import type React from "react"

interface Props {
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}


const Toggle = ({setIsChecked}:Props) => {
  return (
    <div className='flex items-center gap-5 mb-5'>
        <p>Satıcı Hesabını Etkinleştir</p> 
        
<label className="relative inline-flex items-center cursor-pointer">
  <input 
  onChange={(e) => setIsChecked(e.target.checked) } 
  type="checkbox" 
  value="" 
  className="sr-only peer"
  name="isSeller"
  />
  
  <div className="group peer ring-0 bg-rose-400  rounded-full 
  outline-none duration-300 after:duration-300 w-24 h-12  shadow-md 
  peer-checked:bg-emerald-500  peer-focus:outline-none  
  after:content-['✖️']  after:rounded-full after:absolute 
  after:bg-gray-50 after:outline-none after:h-10 after:w-10 
  after:top-1 after:left-1 after:-rotate-180 after:flex 
  after:justify-center after:items-center 
  peer-checked:after:translate-x-12 peer-checked:after:content-['✔️'] 
  peer-hover:after:scale-95 peer-checked:after:rotate-0"/>
  
</label>
    </div>
  )
}

export default Toggle