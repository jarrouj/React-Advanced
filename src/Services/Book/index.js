import { api } from "../api";


export const getBooks = async()=>{
    try{
        return  await api.get('/books');
    }catch(err){
        console.log(err);
    }
}


export const getBook = async(id)=>{
    try {
        return await api.get(`/books/${id}`);
       }catch(err){
        console.log(err);
       }
}

export const createBook = async (newBook) => {
    try {
        return await api.post('/books/', newBook);
       
    } catch (err) {
        console.log(err);
    
    }
}


export const editBook=async(data)=>{
    try{
        return await api.put(`/books/${data.id}`,{
            title: data.data.title,
            author: data.data.author,
            description: data.data.apidescription,
        })
    }catch(err){
        console.log(err)
    }
}

export const deleteBook =async(id) =>{

    try{
        return await api.delete(`/books/${id}`);
    }catch(err){
        console.log(err);
    }
}