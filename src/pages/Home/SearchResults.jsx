import NoteNotFound from "../../components/NoteNotFound"
import NoteCard from "../../components/NotesCard"
import Spinner from "../../components/common/Spinner"

const  SearchResults = ({ searchTerm, searchNote, server_url ,fetchingNotes}) => {
    return (
      <>
        {
          searchTerm &&
          <div className="mx-4">
            <h1 className="text-2xl font-semibold my-4">Search Results for {searchTerm}</h1>
            {
              !searchNote ?
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mx-6 my-2`}>
                  <Spinner />
                </div>
                :
                <div className={` ${searchNote.length === 0 ? "flex  justify-center items-center" : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mx-6 my-2"}`}>
                  {
                    searchNote.length === 0 ? <NoteNotFound /> :
                      searchNote.map((item, index) => {
                        return (
                          <NoteCard
                            date={item.createdAt}
                            key={index}
                            id={item._id}
                            title={item.title}
                            body={item.body}
                            tags={item.tags}
                            server_url={server_url} 
                            />
                        )
                      })
                  }
                </div>
            }
          </div>
        }
      </>
    )
  }
  export default SearchResults