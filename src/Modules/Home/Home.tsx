import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';

export default function Home() {

  var [value, setValue] = useState('');

  var [id, setId] = useState(null);

  var [init, setInit] = useState(null);

  var [reset,setReset] = useState(false);

  var navigate = useNavigate();

  var { photoList } = useSelector((state: any) => state.photoListReducer);

  var { photoListSave } = useSelector((state: any) => state.photoListReducer);

  var [confirm, setConfirm] = useState(false);

  var dispatch = useDispatch();

  var getPhotoList = () => {
    var promise = axios.get('https://jsonplaceholder.typicode.com/photos?_start=1&_end=6');
    promise.then((result) => {
      dispatch({
        type: 'get_data',
        data: result.data,
      })
    })

    promise.catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    getPhotoList();
  }, [])

  var handleChange = (event: any) => {
    setValue(event.target.value);
  }

  var renderHeader = (item: any) => {
    if (item.id === id) {
      return <Input onChange={handleChange} onBlur={() => {
        setInit(item.id);
        var index = photoList.findIndex((item: any) => item.id === init);
          if (index !== -1 && confirm === true) {
            var data = photoList[index];
            data.title = value
            dispatch({
              type: 'change_data',
              dataChange: data,
            })
            setConfirm(false);
          }
        setId(null)
      }} type="text" value={value} />
    }
    else {
      return <h3 onClick={() => {
        setConfirm(true);
        setId(item.id);
        setValue(item.title);
        setInit(item.id);
      }}>{item.title}</h3>
    }
  }

  var renderList = (photoList: any) => {
    return photoList.map((item: any, index: any) => {
      return <div className="row mt-5 align-items-center" key={index}>
        <div className="col-2">
          <img src={item.thumbnailUrl} alt="" />
        </div>
        <div className="col-10">
          {renderHeader(item)}
          <p>{Date.now()}</p>
        </div>
      </div>
    })
  }

  if (localStorage.getItem('account')) {
    return (
      <div className="container mt-5">
        <Button onClick={() => {
          var index = photoList.findIndex((item: any) => item.id === init);
          if (index !== -1 && confirm === true) {
            var data = photoList[index];
            data.title = value
            dispatch({
              type: 'change_data',
              dataChange: data,
            })
          }
          setConfirm(false);
        }} type="primary">Confirm</Button>
        <Button onClick={() => {
          setReset(true);
        }} className="ml-5" type="primary" danger>
          Reset
        </Button>
        <Button className="ml-5" danger onClick={() => {
          localStorage.removeItem('account');
          navigate('/login');
        }}>Logout</Button>
        {
          reset === false ? renderList(photoList ) : renderList(photoListSave)
        }
        
      </div>
    )
  }
  else {
    alert('Please login !');
    window.location.pathname = '/login';
    return (
      <div></div>
    )

  }
}
