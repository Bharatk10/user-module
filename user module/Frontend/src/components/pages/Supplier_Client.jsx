import React, { useState } from 'react'
import { Supplier } from './supplier/Supplier'
import { Client } from './client/Client'

export const Supplier_Client = () => {

    let [isSupplier,setIsSupplier] = useState(true)
    let [isClient,setIsClient] = useState(false)


    let handleSupplier =()=>{
        setIsClient(false)
        setIsSupplier(true)
        document.getElementById('supplier').style.backgroundColor = "black"
        document.getElementById('client').style.backgroundColor = "gray"
    }
    let handleClient =() =>{
        setIsClient(true)
        setIsSupplier(false)
        document.getElementById('supplier').style.backgroundColor = "gray"
        document.getElementById('client').style.backgroundColor = "black"
    }

  return (
    <>
        <div className='d-flex mx-3 mt-2'>
            <button id="supplier" type="button" style={{background: 'linear-gradient(45deg, #77d1e1, #3c3c3d)'}} className="btn btn-success fw-medium px-3" onClick={handleSupplier}>Supplier</button>
            &nbsp;&nbsp;
            <button id="client" type="button" style={{background: 'linear-gradient(45deg, #77d1e1, #3c3c3d)'}} className="btn btn-success fw-medium px-4" onClick={handleClient}>Client</button>
        </div>
        <div className=''>
            {
                isSupplier && <Supplier/>
            }
            {
                isClient && <Client/>
            }
        </div>
    </>
  )
}