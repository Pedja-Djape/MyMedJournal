
import NotesList from "../components/NotesList";

const DUMMY_NOTES = [
    {
        id: 0,
        title: 'Interesting article',
        content: "I found this article very interesting.",
        relatedArticle: null
    },
    {
        id: 1,
        title: "Confusion",
        content: "How does this affect that?",
        relatedArticle: null
    },
    {
        id: 0,
        title: 'Interesting article',
        content: "I found this article very interesting.",
        relatedArticle: null
    },
    {
        id: 1,
        title: "Confusion",
        content: "How does this affect that?",
        relatedArticle: null
    },
    {
        id: 0,
        title: 'Interesting article',
        content: "I found this article very interesting.",
        relatedArticle: null
    },
    {
        id: 1,
        title: "Confusion",
        content: "How does this affect that?",
        relatedArticle: null
    },
    {
        id: 0,
        title: 'Interesting article',
        content: "I found this article very interesting.",
        relatedArticle: null
    },
    {
        id: 1,
        title: "Confusion",
        content: "How does this affect that?",
        relatedArticle: null
    }
];

const NotesPage = () => {

    return (
        <>
        <div className="text-center">
            <NotesList notes={DUMMY_NOTES} />
        </div>
            
        </>
    )
}

export default NotesPage;