import bookimage from "../../assets/bookimage.jpg";
interface Prop {
  imageUrl: string;
}
const BookInfoImg = ({ imageUrl }: Prop) => {
  console.log(imageUrl);

  return (
    <div
      className="py-4"
      // className="flex flex-col justify-center align-middle border-black rounded-lg "
    >
      {/* change the image src here after data change */}
      <img
        src={bookimage}
        alt="Book Image"
        className="w-100 h-100 border-black rounded-xl border-4"
      />
    </div>
  );
};

export default BookInfoImg;
