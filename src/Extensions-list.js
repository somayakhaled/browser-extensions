import {useEffect, useState} from 'react';

const Extensions = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetch('/data/data.json')
            .then(response => response.json())
            .then(setData);
    }, []);

    const toggleActive = (id) => {
        setData(prevData => prevData.map(item => 
            item.name === id ? {...item, isActive: !item.isActive} : item
        ));
    };

    const deleteExtension = (id) => {
    setData(prevData => prevData.filter(item => item.name !== id));
    };

    const filteredData = data.filter(item => {
        if (filter === 'all') return true;
        if (filter === 'active') return item.isActive;
        if (filter === 'inactive') return !item.isActive;
        return true;
    });

    function Switch({ isActive, onChange }) {
        return (
            <label className="relative inline-flex cursor-pointer">
                <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={isActive}
                    onChange={onChange}
                />
                <div className={`
                    peer flex w-9 h-5 p-[2px] rounded-full
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                    transition-colors duration-400 ease-in-out
                    ${isActive 
                        ? "bg-red-700 hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-700" 
                        : "bg-neutral-300"}
                    `}>
                    <span className={`
                        w-4 h-4 block rounded-full bg-neutral-0
                        transition-transform duration-500 ease-in-out
                        ${isActive ? "translate-x-4" : "translate-x-0"}
                    `}></span>
                </div>
            </label>
        );
    }

    return ( 
        <section className="flex flex-col justify-between items-center gap-4">
            <div className="flex flex-col gap-4 mb-3 justify-center items-center w-full 
            lg:flex-row lg:justify-between">
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-0">
                    Extensions List</h1>
                <div className="flex justify-center items-center gap-3">
                    <button onClick={() => setFilter('all')}
                      className={`bg-neutral-0 dark:bg-neutral-700 rounded-full px-4 py-2 
                        outline-none focus:outline-2 focus:outline-offset-2 
                        focus:outline-red-400 shadow-sm cursor-pointer hover:bg-neutral-100 
                        dark:hover:bg-neutral-600
                        ${filter === 'all' ? 'bg-red-700 hover:bg-red-500 dark:bg-red-400 dark:hover:bg-red-500 dark:hover:text-neutral-900 text-neutral-0' 
                            : 'text-neutral-900 dark:text-neutral-0'}
                      `}>All</button>
                      
                    
                    <button onClick={() => setFilter('active')}
                        className={`bg-neutral-0 dark:bg-neutral-700 rounded-full px-4 py-2 
                            outline-none focus:outline-2 focus:outline-offset-2 
                            focus:outline-red-400 shadow-sm cursor-pointer hover:bg-neutral-100 
                            dark:hover:bg-neutral-600
                        ${filter === 'active' ? 'bg-red-700 hover:bg-red-500 dark:bg-red-400 dark:hover:bg-red-500 dark:hover:text-neutral-900 text-neutral-0' 
                            : 'text-neutral-900 dark:text-neutral-0'}
                        `}>Active</button>
                    
                    <button onClick={() => setFilter('inactive')}
                        className={`bg-neutral-0 dark:bg-neutral-700 rounded-full px-4 py-2 
                        outline-none focus:outline-2 focus:outline-offset-2 
                        focus:outline-red-400 shadow-sm cursor-pointer hover:bg-neutral-100 
                        dark:hover:bg-neutral-600
                        ${filter === 'inactive' ? 'bg-red-700 hover:bg-red-500 dark:bg-red-400 dark:hover:bg-red-500 dark:hover:text-neutral-900 text-neutral-0' 
                            : 'text-neutral-900 dark:text-neutral-0'}
                        `}>Inactive</button>  
                </div>
            </div>
            
            
            <section className="grid grid-cols-1 justify-center items-center gap-4 
            sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredData.map((item) => (
                    <div key={item.name} className="w-full h-full p-3 flex flex-col gap-4 
                    justify-between items-center rounded-xl bg-neutral-0 dark:bg-neutral-800 
                    shadow-sm md:w-full">
                        <div className="flex gap-4 items-start">
                            <img src={item.logo} alt={item.name} />
                            <div className="flex flex-col gap-1 text-left">
                                <h2 className="font-bold text-xl text-neutral-900 
                                dark:text-neutral-100">{item.name}</h2>
                                <p className="text-neutral-600 dark:text-neutral-300 
                                leading-[1.3]">
                                    {item.description}     
                                </p>
                            </div>
                        </div>
        
                        <div className="flex justify-between items-center w-full">
                            <button onClick={() => deleteExtension(item.name)}
                            className="border rounded-full border-neutral-300 outline-none 
                            focus:outline-2 focus:outline-offset-2 focus:outline-red-700 
                            dark:focus:outline-red-500 px-3 py-1 cursor-pointer 
                            hover:bg-red-700 hover:text-neutral-0 hover:border-red-700 
                            dark:hover:border-red-500 dark:hover:bg-red-500 
                            dark:hover:text-neutral-900 dark:bg-neutral-800 
                            dark:text-neutral-0">
                                Remove
                            </button>
                            
                            <Switch 
                                isActive={item.isActive} 
                                onChange={() => toggleActive(item.name)}
                            />
                        </div>
                    </div>
                ))}
            </section>
        </section>
    );
}

export default Extensions;