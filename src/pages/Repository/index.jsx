import React,{useEffect ,useState} from "react";
import {useRouteMatch,Link} from 'react-router-dom'
import api from "../../service/api";

import logo from '../../assets/logo.svg'
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import { RepositoryInfo,Header,Issues } from "./styles";

export default function Repository(){
  const [repository,SetRepository]=useState(null)
  const [issues,SetIssues]=useState([])
  const {params} = useRouteMatch()
  useEffect(()=>{
    api.get(`repos/${params.repositories}`).then(response=>SetRepository(response.data))
    api.get(`repos/${params.repositories}/issues`).then(response=>SetIssues(response.data))
  },[params.repositories])
  console.log(params)
  return(
    <>
    <Header>
      <img src={logo} alt="GitExplore"/>
      <Link to={'/'}>
        <FiChevronLeft size={16}/>
        Voltar
      </Link>
    </Header>
    {repository && (
        <RepositoryInfo>
        <header>
          <img src={repository.owner.avatar_url} alt="" />
          <div>
            <strong>{repository.full_name}</strong>
            <p>{repository.description}</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>{repository.stargazers_count}</strong>
            <span>starts</span>
          </li>
          <li>
            <strong>{repository.forks_count}</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>{repository.open_issues_count}</strong>
            <span>Issues</span>
          </li>
        </ul>
      </RepositoryInfo>
    )}
  
    <Issues>

      {issues.map((issue)=>(
         <a key={issue.id} href={issue.html_url}>
         <div>
           <strong>{issue.title}</strong>
           <p>{issue.user.login}</p>
         </div>
         <FiChevronRight size={20}/>
       </a>
      ))}
   

    </Issues>
    </>
  )
}