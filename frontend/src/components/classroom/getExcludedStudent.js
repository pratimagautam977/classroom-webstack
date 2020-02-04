import React, {useState} from 'react';

export default function getExcludedStudent(props) {
    const [ExcludedStudent, setExcludedStudent] = useState([]);
    useEffect(() => {
        GetExcludedStudent(props.ider).then(res => {
          setExcludedStudent(res);      
        })
    }, [id]);
    
    
    return ExcludedStudent;
}
