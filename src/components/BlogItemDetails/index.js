import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const dummy = {
  title: 'Blog Name',
  imageUrl: 'https://assets.ccbp.in/frontend/react-js/placeholder-3-img.png',
  avatarUrl: 'https://assets.ccbp.in/frontend/react-js/avatar-img.png',
  author: 'Author Name',
  content:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
}

class BlogItemDetails extends Component {
  state = {isLoading: true, blogData: dummy}

  componentDidMount() {
    this.getBlogData()
  }

  getBlogData = async () => {
    const {match} = this.props
    const data = await fetch(`https://apis.ccbp.in/blogs/${match.params.id}`)
    const dataJson = await data.json()
    const updatedData = {
      id: 1,
      title: dataJson.title,
      imageUrl: dataJson.image_url,
      avatarUrl: dataJson.avatar_url,
      author: dataJson.author,
      content: dataJson.content,
      topic: dataJson.topic,
    }
    this.setState({isLoading: false, blogData: updatedData})
  }

  renderBlogItemDetails = () => {
    const {blogData, isLoading} = this.state
    const {title, imageUrl, content, avatarUrl, author} = blogData
    return isLoading ? (
      <Loader
        className="blog-details-title"
        type="TailSpin"
        color="#00BFFF"
        height={50}
        width={50}
      />
    ) : (
      <div className="blog-info">
        <h2 className="blog-details-title">{title}</h2>
        <div className="author-details">
          <img className="author-pic" src={avatarUrl} alt={author} />
          <p className="details-author-name">{author}</p>
        </div>
        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }

  render() {
    return <div className="blog-container">{this.renderBlogItemDetails()}</div>
  }
}

export default BlogItemDetails
