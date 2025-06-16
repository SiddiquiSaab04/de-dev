const PostCard = ({ title, description }) => {
    return (
      <div className="bg-white rounded shadow-md overflow-hidden p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    );
  };
  
  export default PostCard;
  