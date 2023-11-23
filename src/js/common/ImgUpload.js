import { useEffect } from "react";
import "../../style/myhidden.css";

const ImgUpload = ({imageUrl,setImageUrl}) => {
  const img = document.getElementById('img');
  const preview = document.getElementById('preview');

  useEffect(()=>{
    if(imageUrl){
      img.classList.remove('myhidden');
      preview.classList.add("hidden");
    }
  },[imageUrl])

  /** 사진 업로드 함수 */
  const handleUploadButton = () => {
    const input = document.getElementById('image');
    const file = input.files[0];

    if(file){
      const allowedExts = ['.jpg', '.jpeg', '.png'];
      const ext = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();

      if (allowedExts.includes(`.${ext}`)) {
        const reader = new FileReader();

        reader.onload = (e) => {
          setImageUrl(e.target.result);
        };

        reader.readAsDataURL(file);
        img.classList.remove('myhidden');
        preview.classList.add("hidden");
      } else{
        alert("확장자가 jpg, jpeg, png 인 파일만 업로드 할 수 있습니다.");
      }
    }
  }

  return (
    <div className="border bg-white shadow-inner rounded-md relative flex flex-col items-center h-[20rem] md:h-full">
        <div className="my-5 w-[90%] h-10 border rounded-lg shadow-inner flex justify-center drop-shadow items-center">사진 기록 📸</div>
        <div className="w-[90%] h-[60%] shadow-inner border rounded-lg flex flex-col justify-center items-center text-gray-600">
            <div id="preview" className="flex flex-col items-center text-center text-[70%] sm:text-sm w-[90%]">
                jpg, jpeg, png 확장자로 시작하는 파일을 등록하실 수 있습니다
            </div>
            <img id="img" alt="foodImage" src={imageUrl} className="rounded-lg drop-shadow-md h-full w-full myhidden"/>
        </div>
        <label htmlFor="image" className="border absolute bottom-0 right-2 text-[60%] sm:text-[100%]
        rounded-lg shadow-lg w-24 h-8 mb-2 flex justify-center items-center bg-[#14A8DD] hover:bg-[#3A84F5] text-white">등록하기</label>
        <input onChange={handleUploadButton} type="file" id="image" accept=".jpg, .jpeg, .png" className="hidden"/>
  </div>
  )
}

export default ImgUpload