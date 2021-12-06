import React, { useEffect } from "react";
import  useState  from 'react-usestateref'
import TextareaAutosize from "react-autosize-textarea"
import { useDispatch, useSelector } from "react-redux";
import { selectNtbks } from "./ntbksNChapters/ntbksSlice";
import { selectChaptersFiltered } from "./ntbksNChapters/chaptersSlice";
import { main, Save } from "../../../utils/icons/main/main";
import { selectTopicById, selectTopicIds, selectTopicsFiltered, updateTopic } from "./topics/topicsSlice";
import { saveNewDraftedNtbk, updateDraftedNtbk } from "./draftedNtbksSlice";
import { updateDraftedTopic, updateDraftedTopics } from "./draftedTopicsSlice";


const TopicEdited = ({topic, count, setCount, draftedNtbk, setDraftedNtbk, }) => {
    const [ newTopic, setNewTopic, newTopicRef ] = useState(topic)
    const { topic_title, topic_content } = newTopicRef.current
    const trimmedContent = topic_content.trim()
    console.log(trimmedContent)

    const handleChange = (e) => {
        setNewTopic((prevContent) => ({
            ...prevContent,
            [e.target.name]: e.target.value,
        }));
        setDraftedNtbk(prevDraft => {
            const topics = draftedNtbk.topics
            const topicEditedIdx = (() =>{
                for (let i = 0; i < topics.length; i++){
                    if (topics[i].id === newTopic.id)
                    return i
                }
                return -1
            })()
            topics.splice(topicEditedIdx,1,newTopicRef.current)
            return ({
            ...prevDraft,
            topics:topics
            })
        })
        setCount(() => count + 1)
    }
    
    return (
        <>
        {/* add a border to this div so the topic title and content wont move when start editing */}
        <div className = "border border-white">
            <h6 className ="mb-1">
            <TextareaAutosize
                className = "topicTitle-edited-input w-100 text-start m-0 p-0"
                id = "topic_title"
                name = "topic_title"            
                value = {topic_title}
                onChange = {handleChange}
            />
            </h6>
            <p className = "mb-0 p-0">
            <TextareaAutosize
                className = "topicContent-edited-input text-display w-100 m-0 p-0 "
                type = "textarea"
                id = "topic_content"
                name = "topic_content"      
                value = {trimmedContent}
                onChange ={(e) => handleChange(e)} 
                // onKeyDown = {(e) => {
                //     console.log(e.key)
                //     const value = e.target.value
                //     if (e.key === "Tab") {
                //     setnewTopic((prevContent) => ({
                //         ...prevContent,
                //         [e.target.name]: e.target.value + "\t",
                //     }))
                //     console.log("hello")
                // };
                // }}
            />
            </p>
        </div>
    </>
    )
}


const TopicItemList = ({id, mapIdx, draftedNtbk, setDraftedNtbk, count, setCount}) => {
    const topic = useSelector(state => selectTopicById(state, id))
    const { topic_title } = topic
    return (
    <section    id = {`${topic_title}`} 
                className = "topicDisplay px-3 pb-1" >
        <TopicEdited
            draftedNtbk = {draftedNtbk} setDraftedNtbk = {setDraftedNtbk}
            topic = {topic} 
            mapIdx = {mapIdx} 
            count = {count}
            setCount = {setCount}
        />
    </section>
    )
}

export default function EditCompleteNtbk(props) {
    const { edit, newNtbk, setNewNtbk, newChap, setNewChap } = props
    //There is a bug when refreshing the page. It doesnt show the correct topicList => need to fix this
    const [ editedTopics, setEditedTopics ] = useState([]);
    const topics = useSelector(selectTopicsFiltered)
    const { ntbkSelected } = useSelector(state => state.ntbks);
    const { chapterSelected } = useSelector(state => state.chapters)
    const initialDraft = {
        user_id: ntbkSelected.user_id,
        ntbk_title: newNtbk.ntbk_title,
        chapter_title: newChap.chapter_title,
        topics: topics
    }
    const [ draftedNtbk, setDraftedNtbk, draftedNtbkRef ] = useState(initialDraft);
    const [ count, setCount ] = useState(0)
    const [ newTopic, setNewTopic ] = useState({topic_title: "", topic_content: ""})
    // const draftedNtbkIds = useSelector(draftedNtbkIds)
    const dispatch = useDispatch()
    const refDraftedNtbk = draftedNtbkRef.current
    useEffect (() => {
        const draftedTopics = []
        const draftedTopicForUpdate = []
        draftedNtbk.topics.forEach((topic, idx) => {
            const { user_id, topic_title, topic_content } = topic
            const draftedTopic = {
                user_id: user_id,
                ntbk_title: refDraftedNtbk.ntbk_title,
                chapter_title: refDraftedNtbk.chapter_title,
                topic_title: topic_title,
                topic_content: topic_content
            }
            // const draftedTopicForUpdate = {
            //     id: topic.id,
            //     user_id: topic.user_id,
            //     ntbk_title: refDraftedNtbk.ntbk_title,
            //     chapter_title: refDraftedNtbk.chapter_title,
            //     topic_title: topic.topic_title,
            //     topic_content: topic.topic_content
            // }
            // dispatch(updateDraftedTopic({id: topic.id, changes: {...draftedTopic}}))
            draftedTopics.push({...draftedTopic, id:topic.id})
            draftedTopicForUpdate.push({id: topic.id, changes: {...draftedTopic}})
        })


        dispatch(updateDraftedTopics(draftedTopics))
        // setDraftedNtbk(prevDraft => ({
        //     ...prevDraft,
        //     user_id: ntbkSelected.user_id,
        //     ntbk_title: newNtbk.ntbk_title,
        //     chapter_title: newChap.chapter_title,
        //     topic_title: topic_title,
        //     topic_content: topic_content
        // }))
        // dispatch(updateDraftedNtbk())
    },[count])
    
    // console.log(draftedTopics)
    // const [ newTopic, setnewTopic ] = useState()
    // const { topic_id, topic_title, topic_content } = newTopic
    // useEffect(() => {
    //     const trimmedContent = topic_content.trim();
    //     const saveTopic = {
    //         ...newTopic,
    //         topic_content: trimmedContent
    //     }
    //     // topics.splice(mapIdx,1,saveTopic)
    //     // editedTopics.splice(mapIdx,1,saveTopic)
    // },[count])
    // const ntbkSelectedIdx = (() =>{
    //     for (let i = 0; i < ntbks.length; i++){
    //         if (ntbks[i].id === ntbkSelected.id)
    //         return i
    //     }
    //     return -1
    // })()
    // const chapSelectedIdx = (() =>{
    //     for (let i = 0; i < chapters.length; i++){
    //         if (chapters[i].id === chapSelected.id)
    //         return i
    //     }
    //     return -1
    // })()

    // useEffect (() => {
    //     newNtbks.splice(ntbkSelectedIdx,1,newNtbkRef.current)
    //     newChaps.splice(chapSelectedIdx,1,newChapRef.current)
    // },[newNtbkRef.current, newChapRef.current]);

    const handleChangeNtbkTitle = ({target: {name, value}}) => {
        setNewNtbk((prevNtbk) => ({
            ...prevNtbk,
            [name]: value
        }))
        setDraftedNtbk(prevDraft => ({
            ...prevDraft,
            [name]: value,
            user_id: ntbkSelected.user_id,
        }))
        setCount(() => count + 1)
    }
    const handleChangeChapTitle = ({target: {name, value}}) => {
        setNewChap((prevChap) => ({
            ...prevChap,
            [name]: value
        }))
        setDraftedNtbk(prevDraft => ({
            ...prevDraft,
            [name]: value,
            user_id: ntbkSelected.user_id,
        }))
        setCount(() => count + 1)

    }

    const [ error, setError ] = useState()
    const handleSubmit = (e) => {
        e.preventDefault();
        // setTopics(() => newTopics);
        // topcs.saveTopics(newTopics);
        // updateNtbk(newNtbkRef.current)
        // .then(() => updateChapter(newChapRef.current))
        // .then(() => {
        //     editedTopics.forEach((topic, idx) => {
        //         if(updatedIds.includes(topic.topic_id))
        //         updateTopic(topic)
        //     })
        // })
        // .catch(setError)
    }
    const topicIds = useSelector(selectTopicIds)
    const topicListEdited = topicIds.map((topicId, mapIdx) => (
        <TopicItemList key = {mapIdx} id = {topicId} mapIdx = {mapIdx} 
                        newTopic = {newTopic} setNewTopic = {setNewTopic}
                        count = {count} setCount = {setCount}
                        draftedNtbk = {draftedNtbkRef && draftedNtbkRef.current} 
                        setDraftedNtbk = {setDraftedNtbk}
                        />
    ))
    return ( ntbkSelected && chapterSelected && edit &&
        <form onSubmit = {handleSubmit}>
            <div className = "bg-white topiclist-box-edited">    
                <div className = "w-100 py-1 d-flex justify-content-center align-items-center " >
                    <h3 className = "d-flex align-items-center m-0 w-100" >
                        <input
                            className = "ntbkTitle-edited-input w-100 text-center m-0 p-0"
                            type = "text"
                            id = "ntbk_title"
                            name = "ntbk_title"
                            value = {newNtbk.ntbk_title}
                            onChange = {handleChangeNtbkTitle}
                        >
                        </input>   
                    </h3>
                </div>
                <hr className = "m-0"/>
            {/* add a border to this div so the title chapter and topic list wont move when start editing */}
                <div className = "border border-white">
                    <TextareaAutosize
                        className = "chapTitle-edited-input w-100 text-center my-1 p-0"
                        type = "textarea"
                        id = "chapter_title"
                        name = "chapter_title"
                        value = {newChap.chapter_title}
                        onChange = {handleChangeChapTitle}
                    />
                </div>
                <div className = "">
                      {topicIds.length !== 0
                    ? topicListEdited
                    : <div className = "py-1 "> </div>
                    }
                </div>
                <div className = "d-flex justify-content-start ">
                    <div className = "btnPanel ms-1 d-flex align-items-center" >
                        <div  className = "saveBtn ms-1 ">
                            <div className = "saveBtn p-0 "  >           
                                {main.leftChevron()}
                            </div>
                        </div>
                        <div  className = "saveBtn ms-1 ">
                            <button className = "saveBtn p-0 " 
                                    type = "submit"
                            >
                                <Save />  
                            </button>
                        </div>
                    </div>
                </div>           
            </div>                
        </form>
    )
}