import React from 'react'
import {supabase} from '../../supabase'
import {useEffect, useState} from 'react'

const InventoryDashboard =  () => {
  const [inventory, setInventory] = useState([])
  

  const getInventory = async () => {
    const { data, error } = await supabase.from('inventory').select('*')
    if (error) console.log('error', error)
   
  data ? setInventory(data) : setInventory([])
  }

  useEffect(() => {
    getInventory()
    
  }, [])
  

  return (
    <div>InventoryDashboard</div>
  )
}

export default InventoryDashboard