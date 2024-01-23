import "./App.css";
import {useEffect, useState} from "react";

function App() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://602e7c2c4410730017c50b9d.mockapi.io/users')
    .then(res => res.json())
    .then(apidata => {setData(apidata)})
    .catch(err => {console.log(err)})
  }, [])
  const filteredData = data.filter(item =>
    item.profile.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.profile.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(data);

  return (
    <div className="flex justify-center items-center pt-16">
      {data.length > 0 ? 
        <div className="relative lg:flex lg:flex-nowrap flex-wrap justify-between lg:w-9/12 w-11/12">
          <div className="flex flex-col items-center lg:w-[45%] w-full lg:h-[600px] h-[300px]">
            <p className="w-full bg-[#C5DFFF] text-center p-3 rounded-tl-xl rounded-tr-xl font-medium text-2xl">User List</p>
            
            <div className="flex flex-col gap-y-2 w-full pt-5 h-screen overflow-y-scroll">
             <div className="search "><input
                  type="search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="border-b-2 w-full border-gray-200 py-3 px-7"
                /></div> 
              {
                
                filteredData.map((item) => (<div key={item.profile?.username} className={`${item.profile?.username === selected.profile?.username ? 'bg-green-200': 'bg-[#ECECEC] '} flex w-full items-center gap-x-5 p-2 rounded-lg hover:cursor-pointer`} onClick={() =>{setSelected(item); window.scrollTo({top:0, behavior:'smooth'})}}>
                  <div className="rounded-full ">
                    <img src={item?.avatar} className="rounded-full w-[48px] h-[48px]"/>
                  </div>

                  <div className="flex gap-x-1">
                    <p>{item.profile.firstName}</p>
                    <p>{item.profile.lastName}</p>
                  </div>
                </div>))
              }
            </div>
          </div>

          <div className="flex flex-col items-center lg:w-[40%] w-full lg:pb-0 pb-16 lg:mt-0 mt-10">
              <div className="w-full bg-[#C5DFFF] text-center p-3 rounded-tl-xl rounded-tr-xl font-medium text-2xl">User Details</div>

              <div className="w-full flex flex-col items-center justify-center">
                {
                  selected.Bio ? <div className=" flex flex-col justify-center w-full items-center">
                  <div className="flex flex-col items-center gap-y-8 pt-5 w-9/12">
                <div className="flex flex-col items-center gap-y-5 w-full">
                  <div className="flex flex-col gap-y-2">
                    <img src={selected?.avatar} className="rounded-full"/>
                    <p className="text-center text-[18px] font-medium">@{selected?.profile?.username}</p>
                  </div>

                  <div className="bg-[#DBDBDB] p-5 text-[14px] font-medium border-[1px] border-black rounded-lg w-full">{selected?.Bio}</div>
                </div>

                <div className="flex flex-col gap-y-3 w-full">
                  <div>
                    <p>Full Name</p>
                    <p className="bg-[#DBDBDB] p-2 rounded-lg border-[1px] border-black">{selected?.profile?.firstName} {selected?.profile?.lastName}</p>
                  </div>

                  <div>
                    <p>Job Title</p>
                    <p className="bg-[#DBDBDB] p-2 rounded-lg border-[1px] border-black">{selected?.jobTitle}</p>
                  </div>

                  <div>
                    <p>Email</p>
                    <p className="bg-[#DBDBDB] p-2 rounded-lg border-[1px] border-black">{selected?.profile?.email}</p>
                  </div>
                </div>
              </div>
                  </div> : <div className="flex items-center justify-center pt-28 text-xl font-bold">Selected User Details to be display here</div>
                }
              </div>
          </div>
        </div>
       : 
       <div className="flex w-full h-screen justify-center items-center"><div className="custom-loader"></div></div>}
    </div>
  );
}

export default App;
