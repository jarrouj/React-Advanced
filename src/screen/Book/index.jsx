import { useEffect, useState } from "react"
import { createBook, getBooks } from "../../Services/Book";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createBookSchema } from "../../schemas/createBook.schemas";
import {Input} from '../../components/shared/Input';
import {Label} from '../../components/shared/Label'


export const Book = () =>{

const [isLoading,setIsLoading]=useState(false);
const [isError,setIsError]=useState(null);
const [books, setBooks]= useState([]);

const [showCreatePopup, setShowCreatePopup] = useState(false);

const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    description: '',
});



const handleCreate = async () => {
    try { 
      setShowCreatePopup(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    const validation = await trigger();
    const data = getValues();

if(validation){
    try {
      const createdBook = await createBook(data);

     
      setBooks((oldBooks) => [...oldBooks, createdBook]);      
      setShowCreatePopup(false);

    
    } catch (err) {
      console.log(err);
    }
  }

  };

  const {formState:{errors},register,trigger,getValues}=useForm({
    resolver:yupResolver(createBookSchema)
  })


  useEffect(() => {
    const fetchBooks = async () => {
        try {
            setIsLoading(true);
            const fetchedBooks = await getBooks();
            console.log("Fetched Books:", fetchedBooks);
            setIsLoading(false);
            setBooks(fetchedBooks); 
        } catch (err) {
            setIsError(err);
        }
    };

    fetchBooks(); 

}, []);



//Error handling
if(isLoading){
    return <div>Loading...</div>
}

if(isError){
    return <div>Error occured while retrieving data</div>
}



    return (
        <div>
          <div className="flex justify-center">
        <button onClick={handleCreate} className="bg-gradient-to-r from-green-500 to-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-7">
          Create Book
        </button>
  </div>
        {showCreatePopup && (
          <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <Label className="text-xl font-semibold mb-4 ">Create New Book</Label>
              <Input
              {...register('title')}
                type="text"
                placeholder="Title"
                className="w-full border p-2 mb-2"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              />
              <p className="text-red-700">{errors?.title?.message}</p>
              <Input
              {...register('author')}
                type="text"
                placeholder="Author"
                className="w-full border p-2 mb-2"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              />
              <p className="text-red-700">{errors?.author?.message}</p>

              <textarea
              {...register('description')}
                placeholder="Description"
                className="w-full border p-2 mb-4"
                rows="4"
                value={newBook.description}
                onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowCreatePopup(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
  
{
            books?.data?.map((book)=>{
                const {id,title, author, description}= book;
                return (<div><div key={id} className='flex flex-col space-y-2 w-48 h-32 rounded-md'>
                <h2>{title}</h2>
                <p>{author}</p>
                <p>{description}</p>
            </div>
            {/* {Buttons for delete and edit } */}
             </div>)
            })} 
      </div>
    )
}