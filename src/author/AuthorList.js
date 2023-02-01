import React from 'react'
import { useState ,useEffect } from 'react'
import Axios from 'axios'
import Author from './Author';
import AuthorCreateForm from './AuthorCreateForm';
import AuthorEditForm from './AuthorEditForm';

export default function AuthorList() {

    // State Declaration
    const [authors, setAuthors] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [currentAuthor, setCurrentAuthor] = useState({});

    // React Hooks
    useEffect(() => {
        loadAuthorsList();
    }, [])

    const loadAuthorsList = () => {
        Axios.get("author/index")
        .then((res) => {
          console.log(res);
          console.log(res.data.authors);
          setAuthors(res.data.authors);
        })
        .catch(err => {
          console.log("Error Retreiving Authors!!");
          console.log(err);
        })
    }

    const loadArticlesList = (author) => {
        console.log(author)
        if(author.article){
            const articles = author.article.map((item, key) =>( 
                <td key={key}>
                    <li>{item.title}</li> 
                </td>
            ))
            return articles;
        }
    }

    const addAuthor = (author) => {
        Axios.post("author/add", author, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then((res) => {
            console.log("Author Added Successfully!!!");
            loadAuthorsList()
        })
        .catch((err) => {
            console.log("Error Adding Author");
            console.log(err);
        })
    }

    const editView = (id) => {
        Axios.get(`author/edit?id=${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log("Loaded AUTHOR Information");
            console.log(res.data.author);
            let author = res.data.author;
            setIsEdit(true);
            setCurrentAuthor(author);
        })
        .catch(err => {
            console.log("Error Loading Author Information");
            console.log(err);
        })
    }

    const editAuthor = (author) => {
        Axios.put("author/update", author, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log("Author Updated Successfully!!");
            console.log(res);
            loadAuthorsList();
        })
        .catch(err => {
            console.log("Error Editing Author");
            console.log(err);
        })
    }

    const deleteAuthor = (id) => {
        Axios.delete(`author/delete?id=${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log(res);
            console.log("Record Deleted Successfully");
            loadAuthorsList();
        })
        .catch(err => {
            console.log("Error Deleting Author");
            console.log(err);
        })
    }
    
// console.log(authors[0]);
console.log(currentAuthor)

    const allAuthors = authors.map((author, index) => (
      <tr key={index}>
        <Author {...author} editView={editView} deleteAuthor={deleteAuthor}/>
        {loadArticlesList(author)}
      </tr>  
    ))


  return (
    <div>
        <h1>Authors List</h1>
        <div>
            <table>
                <tbody>
                    <tr>
                        <th> Name </th>
                        <th> Email Address </th>
                        <th> Edit</th>
                        <th> Delete</th>
                    </tr>
                    {allAuthors}
                </tbody>
            </table>
        </div>
        {(!isEdit) ? 
        <AuthorCreateForm addAuthor={addAuthor}></AuthorCreateForm>
        :
        <AuthorEditForm key={currentAuthor._id} author={currentAuthor} editAuthor={editAuthor}></AuthorEditForm>
    }
    </div>
  )
}
