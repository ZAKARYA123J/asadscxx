"use client";
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [order, setOrders] = useState([]);
  const [category,setCategories]=useState([])
  const [type,setTypes]=useState([])
  const [detail,setDetail]=useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on component moun
  useEffect(()=>{
    const fetchCategorie=async()=>{
      try{
        const response =await axios.get('https://immoceanrepo.vercel.app/api/categories')
        setCategories(response.data)
      }catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategorie()
  },[])
  useEffect(()=>{
const fetchtype=async()=>{
  try{
const response=await axios.get('https://immoceanrepo.vercel.app/api/types')
setTypes(response.data)
  }catch(error){
 console.log('error')
  }
}
fetchtype()
  },[])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://immoceanrepo.vercel.app/api/posts');
        setData(response.data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(()=>{
    const fetchDeetail=async()=>{
      setLoading(true)
      try{
        const response=await axios.get('https://immoceanrepo.vercel.app/api/details')
        setDetail(response.data)
      }catch(error){
        handleError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchDeetail()
  },[])
  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://immoceanrepo.vercel.app/api/DateReserve');
        setOrders(response.data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle errors
  const handleError = (error) => {
    if (error.response) {
      setError(`Failed to fetch data: ${error.response.statusText}`);
    } else if (error.request) {
      setError('No response received. Please try again later.');
    } else {
      setError('Failed to fetch data. Please try again later.');
    }
  };

  // Create new data
  const createData = async (newData) => {
    setLoading(true);
    try {
      const response = await axios.post('https://immoceanrepo.vercel.app/api/posts', newData);
      setData((prevData) => [...prevData, response.data]);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Update existing data
  const updateData = async (id, updatedData) => {
    setLoading(true);
    try {
      const response = await axios.put(`https://immoceanrepo.vercel.app/api/posts/${id}`, updatedData);
      setData((prevData) =>
        prevData.map((item) => (item.id === id ? response.data : item))
      );
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete data
  const deleteData = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`https://immoceanrepo.vercel.app/api/posts/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Create new order
  const createOrder = async (newOrder) => {
    setLoading(true);
    try {
      const response = await axios.post('https://immoceanrepo.vercel.app/api/DateReserve', newOrder);
      setOrders((prevOrders) => [...prevOrders, response.data]);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Update existing order
  const updateOrder = async (id, updatedOrder) => {
    setLoading(true);
    try {
      const response = await axios.put(`https://immoceanrepo.vercel.app/api/DateReserve/${id}`, updatedOrder);
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === id ? response.data : order))
      );
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete order
  const deleteOrder = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`https://immoceanrepo.vercel.app/api/DateReserve/${id}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        order, // Provide orders state
        category,
        type,
        loading,
        detail,
        error,
        createData,
        updateData,
        deleteData,
        createOrder, // Provide order manipulation functions
        updateOrder,
        deleteOrder
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
