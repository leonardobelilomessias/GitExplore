import React,{useState,useEffect} from "react";
import { Title,Form, Repositories,Error } from "./styles";
import {FiChevronRight} from 'react-icons/fi'
import logo from '../../assets/logo.svg'
import api from "../../service/api";
import {Link} from 'react-router-dom'

export default function Dashboard(){
  const[newRepo,SetNewrepo]=useState('')
  const [repositories,SetRepositories]= useState(()=>{
    const storageRepositories = localStorage.getItem('@GitHubexplore:repositories')
    if(storageRepositories){
      return JSON.parse(storageRepositories)
    }
    return[]
  })
  const[inputErro,SetinputErro]=useState('')

  useEffect(()=>{
    localStorage.setItem('@GitHubexplore:repositories',JSON.stringify(repositories))
  },[repositories])
 

  async function HandleAddRepository(event){
    event.preventDefault()
    if(!newRepo){
      SetinputErro('Digite um repositorio')
      return
    }
   try{ 
    const response = await api.get(`repos/${newRepo}`)
    const repository = response.data
    SetRepositories([...repositories, repository])
    SetinputErro('')
    SetNewrepo('')
  }catch(err){
    SetinputErro('Erro na busca de repositorio')
  }
}

  return(
    <>
    <img src={logo} alt="gitHub"/>
  <Title>Explore repositorios no Github</Title>
  <Form hasError={!!inputErro} action ="" onSubmit={HandleAddRepository}>
    <input type="text" placeholder=" Digite aqui" value={newRepo} onChange={(e)=> SetNewrepo(e.target.value)}/>
    <button type="submit">Pesquisar</button>
  </Form>
  {inputErro && <Error>{inputErro}</Error>}
  <Repositories>
    {repositories.map(repository =>(
        <Link key= {repository.full_name} to={`/repositories/${repository.full_name}`}>
        <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
        <div>
          <strong>{repository.full_name}</strong>
          <p>{repository.description}</p>
        </div>
        <FiChevronRight size={20}/>
      </Link>
    ))}
    
  </Repositories>

  
    </>
  )
}