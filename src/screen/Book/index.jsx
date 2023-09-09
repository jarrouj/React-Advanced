import { createBook, deleteBook, getBooks } from "../../Services/Book";
import { useQuery } from "react-query";
import { useState } from "react";
import { CreateDialog } from "../../components/CreateDialog";
import { DeleteDialog } from "../../components/DeleteDialog";


export const Book=()=>{
  const {data, isLoading, isError, refetch, isRefetching}= useQuery({
      queryFn: ()=>getBooks(),
      queryKey: ["books"],
      staleTime: Infinity
  })

  const [open,setOpen]= useState(false);
  const [mode, setMode]= useState("create");
  const [selectedItem, setSelectedItem]= useState(null);
  const [isDelete, setIsDelete]= useState(false);

  const handleDelete=(item)=>{
      setSelectedItem(item);
      setIsDelete(true)
  }


  

  //Error handling
  if(isLoading || isRefetching){
      return <div role="status" className='h-screen flex items-center justify-center'>
      <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
  
  </div>
  }

  if(data?.data?.length===0){
      return <div className='h-screen flex flex-col space-y-6 items-center justify-center'>
          <h1 className='text-lg'>
          You have not created any books yet...
          </h1>
          <button onClick={()=>{
              setMode('create');
              setOpen(true);
          }} className='px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-green-500 text-white hover:text-gray-100 w-48 '>Create a new book</button>
          <CreateDialog refetch={refetch} open={open} onClose={()=>setOpen(false)}/>
      
      </div>
  }

  if(isError){
      return <div>Error occured while retrieving data</div>
  }

  return (
      <div className='px-8 py-8  '>
          <div className='flex flex-col'>
          <button onClick={()=>{
              setMode("create");
              setOpen(true);
          }} className='px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-green-500 text-white hover:text-gray-100 w-48 self-end'>Create a new book</button>
          <div className='grid grid-cols-4 gap-y-8 mt-10'>
              {data?.data?.map((book)=>{
                  return (
                      <div className='flex flex-col space-y-2 rounded-md bg-purple-500 shadow-md w-64 hover:scale-105 text-white px-8 py-4 transition-all' key={book.id}>
                          <h2 className='text-2xl'>{book.title}</h2>
                          <hr/>
                          <div className='mb-6 mt-4'>
                              <p className='text-lg'>{book.author}</p>
                              <p className='text-sm'>{book.description}</p>
                          </div>
                          
                          <div className='flex space-x-2 '>
                             
                              <button onClick={()=>{
                                  setMode("edit");
                                  setOpen(true);
                                  setSelectedItem(book)
                              }} className='px-4 py-2 rounded-md bg-white text-purple-500  w-48 self-end'>Edit</button>
                               <button onClick={()=>handleDelete(book)} className='px-4 py-2 rounded-md  text-white  w-48 self-end'>Delete</button>
                          </div>
                  
                      </div>
                      
                  );
              })}
          </div>
          
          </div>

          <CreateDialog key={mode==="create"?"create":selectedItem.id} item={selectedItem} mode={mode} refetch={refetch} open={open} onClose={()=>setOpen(false)}/>
          <DeleteDialog open={isDelete} onClose={()=>setIsDelete(false)} refetch={refetch} item={selectedItem}/>
      </div>
  );

}