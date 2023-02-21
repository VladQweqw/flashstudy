import {useState, useEffect} from 'react'
import { Outlet, useNavigate, useParams } from 'react-router'
import { useQuery } from 'react-query';
import anime from 'animejs'
import { singularURLNames, STAGGER_DURATION } from '../../../functions/functions';
import { API } from '../../../functions/API';
import { contextMenuType, slideCategories } from '../../../functions/types';
import NoContent from '../../../components/noContent';
import Loader from '../../../components/loader';

import { Card, Exam, Note } from '../Slides/categories';



function Slide(data: {
    item: any,
    type: slideCategories
 }): JSX.Element {

    

    if(data.type === 'card') return  <Card  {...data} />
    if(data.type === 'note')  return  <Note  {...data} />
    if(data.type === 'exam')  return  <Exam  {...data} />
    
    return <h1>err</h1>
}