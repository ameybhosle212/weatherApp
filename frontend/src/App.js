import { useState, useEffect } from "react"
import './App.css';
import axios from "axios";
function App() {
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const allCountries = async () => {
    const { data } = await axios.get("https://restcountries.com/v3.1/all?fields=name")

    let pppp = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      pppp.push(element)
      setCountry(pp => [...pp, element['name']['common']])
    }
  }
  useEffect(() => {
    allCountries();
  }, [])
  const [city, setCity] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [temp, setTemp] = useState(false);
  const [humidity, setHumidity] = useState(false);
  const Submit = async (e) => {
    e.preventDefault();
    if (selectedCountry !== 'Select' && selectedCountry.length > 0 && city!== '') {
      const { data } = await axios.post("http://localhost:2200", {
        'city': city,
        'location': selectedCountry
      })
      if (data.error == null) {
        setTemp(data.temperature);
        setHumidity(data.humidity);
        setShowModal(true);
      } else {
        alert(data.error);
      }
    }else{
      alert("Fill Each Detail")
      setCity('');
    }
  }
  const closeModal = () => {
    setShowModal(false)
    setCity('');
  }
  const CountryChange = (e) => {
      setSelectedCountry(e.target.value);
  }
  return (
    <>
      <form onSubmit={Submit}>
        <div className="relative w-full lg:max-w-sm">
          <select className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600" onChange={CountryChange}>
            <option value="Select">Select</option>
            {
              country.map((value, index) => (
                <option key={index} value={value}>{value}</option>
              ))
            }
          </select>
        </div>
        <div className="wrapper">
          <input type="text" onChange={e => setCity(e.target.value)} value={city} />
          <button type="submit">Search</button>
        </div>
      </form>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Temperature in {city}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => closeModal()}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <h3>Temperature is {temp}</h3>
                  <h3>Humidity is {humidity}</h3>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => closeModal()}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default App;
