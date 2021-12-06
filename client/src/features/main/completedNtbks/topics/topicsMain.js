import React, { useEffect } from "react";
import useState from "react-usestateref"
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useLocation } from "react-router";
import Errors from "../../../../errors/errors";
import { selectTopicById, selectTopicIds } from "./topicsSlice";
import { recentUrl } from "../../../accounts/login/loggedInsSlice";
import EditCompleteNtbk from "../EditCompleteNtbk";

export const TopicListItem = ({id}) => {
    const topic = useSelector(state => selectTopicById(state, id))
    const { topic_title, topic_content } = topic
    const content = topic_content.trim();
    return (
        <>
        {/* add a border to this div so the topic title and content wont move when start editing */}
            <section    id = {`${topic_title}`} 
                        className = "px-3 pb-1 border border-white"
            >
                <div style = {{height:"0.3px"}}></div>    
                <h6 className ="mt-0">{topic_title}</h6>
                <p  className = "text-display w-100 my-1 p-0" >
                    {content}
                </p>
                <div style = {{height:"1px"}}></div>         
            </section>
        </>
    )}


const NonEdited = ({edit, ntbkTitle, chapter, renderedList}) => {
    return !edit &&
    <div className = "bg-white offset-topiclist-box-edited" style = {{margin: "3px"}}
    >
        <div className = "py-1 w-100 d-flex justify-content-center align-items-center " >
            <h3 className = "text-center m-0 " >
                {ntbkTitle}
            </h3>
        </div>
        <hr className = "m-0"/>
        {/* add border so the title chapter and topic list wont move when start editing */}
        <div className = "border border-white">           
            <h5 className = "text-start my-1 text-center "> 
                {chapter && chapter.chapter_title}
            </h5>
        </div>
        <div style = {{height: "6.5px"}}></div>
        <div className = "">
            {renderedList}
        </div>
    </div>
}

export default function TopicsMain(props) {
    //Use useState and useEffect to update the state immediately
    const { ntbks_chaps_topics : { edit }} = useSelector(state => state.complementaries) 
    const [ error, setError ] = useState(null)
    const { ntbkSelected } = useSelector(state => state.ntbks);
    const { chapterSelected } = useSelector(state => state.chapters)
    const url = useLocation().pathname
    useEffect(() => {
        recentUrl.saveUrl(url)
    },[])
    useEffect(() => {
        setNewNtbk(() => ntbkSelected )
    },[ntbkSelected])
    useEffect(() => {
        setNewChap(() => chapterSelected)
    },[chapterSelected])
    const [ newNtbk, setNewNtbk, newNtbkRef ] = useState(ntbkSelected)
    const [ newChap, setNewChap, newChapRef ] = useState(chapterSelected)
    const topicIds = useSelector(selectTopicIds)
    const renderedTopicList = topicIds.map((topicId,idx) => {
        return <TopicListItem key = {idx} id = {topicId} />
    })
    const loader = <div className = "loader"/>
    return (
        <>
        {/* <p style = {{background:"white"}} className = "px-2">
        Speaking to Fox News, a parent in California who has witnessed the impact of masking school children, said: "Parents have been begging for the same consideration that teacher union and education leaders extended to themselves; for their kids to be able to hear their classmates. Randi is at higher risk of severe covid as a vaccinated senior than my unvaccinated young children."

"Their soft voices have been muffled for nearly two years and we are one of the few countries masking toddlers and grade school children," the parent added. "It’s not lost on me that this severe obligation on kids would not exist if it weren’t for Ms. Weingarten and the other corrupt leaders that run our public education system."        
        </p> */}
        <Errors error = {error} />
        <NonEdited  edit = {edit} ntbkTitle = {newNtbkRef.current.ntbk_title} 
                    chapter = {newChapRef.current}
                    renderedList = {renderedTopicList}
                    />
        <EditCompleteNtbk edit = {edit} 
            newNtbk = {newNtbk} setNewNtbk = {setNewNtbk} 
            newChap = {newChap} setNewChap = {setNewChap}
        />
        
        {/* <>
            <div className = "bg-white "
                style = {{border: "1px solid #e9ecef", margin:"0px 3px"}}
            >
                <div className = "py-2 w-100 d-flex justify-content-center align-items-center " >
                    <h3 className = "ntbkHeader text-center m-0 " >
                        {newNtbkRef.current.ntbk_title}
                    </h3>
                </div>
                <hr className = "m-0"/>
                <div >           
                    <h5 className = "text-start my-1 text-center "> 
                        {newChapRef.current && newChapRef.current.chapter_title}
                    </h5>
                </div>
                <div style = {{height: "6.5px"}}></div>
                <div className = "">
                    {renderedTopicList}
                </div>
            </div>
        </> */}
        {/* <ul className = "list-group">
            {renderedTopicList}
        </ul>
        {loader} */}
        {/* <DnD notebooks = {notebooks}/> */}
        </>
    )
}