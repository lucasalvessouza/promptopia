import PromptCard from "@components/PromptCard"
import { Loader } from "./Loader"

const Profile = ({
  name,
  desc,
  handleEdit,
  handleDelete,
  data,
  isLoading
}) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>
          {name} Profile
        </span>
      </h1>
      <p className='desc text-left'>{desc}</p>
        {isLoading ? 
          <div className="mt-[50px]">
            <Loader />
          </div> :
          <div className='mt-16 prompt_layout'>
            {data.map(post => (
              <PromptCard
                key={post._id}
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
              />
            ))}
          </div>
        }
    </section>
  )
}

export default Profile