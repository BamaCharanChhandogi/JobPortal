import axios from 'axios';
const API_URL = 'http://localhost:8800/api-v1';
export const API = axios.create({
    baseURL: API_URL,
    responseType: 'json',
});

export const apiRequest = async({url,token,data,method})=>{
    try {
        const result = await API(url,{
            method: method || 'GET',
            data: data,
            headers: {
                'Content-Type': 'application/json',
                Authorization:token ?`Bearer ${token}` : ''
            }

        });
        return result?.data;
    }
    catch (err) {
        console.log(err.response.data);
        return {status:err.success, message:err.message};
    }
};

export const handelFileUpload = async(uploadFile)=>{
    const formData = new FormData();
    formData.append('file',uploadFile);
    formData.append('upload_preset','jobfinder');
    try {
       const response = await axios.post('https://api.cloudinary.com/v1_1/dbtojtm7w/image/upload',formData);
         return response.data.secure_url;
    }
    catch (err) {
        console.log(err);
        return {status:err.success, message:err.message};
    }
};

export const updateURL = ({
    pageNum,
    query,
    location,
    cmpLoc,
    sort,
    navigate,
    jType,
    exp
  }) => {
    const params = new URLSearchParams();
    if (pageNum && pageNum > 1) {
      params.set('page', pageNum);
    }
    if (query) {
      params.set('q', query);
    }
    if (location) {
      params.set('l', location);
    }
    if (cmpLoc) {
      params.set('cl', cmpLoc);
    }
    if (sort) {
      params.set('sort', sort);
    }
    if (jType) {
      params.set('jt', jType);
    }
    if (exp) {
      params.set('exp', exp);
    }
    const newURL = `${location.pathname}?${params.toString()}`;
    navigate(newURL, { replace: true });
    return newURL;
  };
  