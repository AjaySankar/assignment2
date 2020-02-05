const RESET_VALUES = {name: '', price: '', category: '', image: ''}

class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        products: {
          1 : {
          "name": "Blue Shirt",
          "price": "16.99",
          "category": "Shirts",
          "image": "https://ae01.alicdn.com/kf/HTB1IeK7d_tYBeNjy1Xdq6xXyVXaa.jpg"
        },
        2 : {
          "name": "Logo Hat",
          "price": "12.99",
          "category": "Accessories",
          "image": "https://images.swag.com/convert/swag-prod/image-5d7f91e883338b0919bffe9d.png"
        },
        3 : {
          "name": "Regular Fit Jeans",
          "price": "34.99",
          "category": "Jeans",
          "image": "https://i5.walmartimages.com/asr/a0b2a844-1c46-4d92-8640-4322ebe807f1_1.14b61b891d76f250f38515149d2daf75.jpeg"
        }
      },
      formData: null
    }
    this.handleSave = this.handleSave.bind(this)
  }
  handleSave(product) {
    this.setState((prevState) => {
      let products = prevState.products
      products[Math.floor((Math.random() * 1000000) + 1)] = product
      return { products }
    })
  }
  render() {
    return (
      <div>
      <ProductTable products={this.state.products}/>
      <h3> Add a new product to inventory </h3>
      <hr/>
      <ProductForm
        key={JSON.stringify(this.state.formData || {})} formInput={this.state.formData} onSave={this.handleSave}/>
      </div>
    )
  }
}

class ProductRow extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <tr>
        <td> {this.props.product.name || ' '} </td>
        <td> {this.props.product.price || ' '} </td>
        <td> {this.props.product.category || ' '} </td>
        <td> <a href = {this.props.product.image || '#'} target="__blank"> View </a> </td>
      </tr>
    )
  }
}

class ProductTable extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const rows = Object.keys(this.props.products).map((id) => {
      const productInfo = this.props.products[id] || {};
      return <ProductRow key={id} product={productInfo}/>
    })
    return (
      <table>
        <thead>
          <tr>
            <th> Product Name </th>
            <th> Price </th>
            <th> Category </th>
            <th> Image </th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

class ProductForm extends React.Component {
  constructor(props) {
    super(props)
      this.handleChange = this.handleChange.bind(this)
      this.handleSave = this.handleSave.bind(this)
      this.state = {
          product: this.props.formInput || Object.assign({}, RESET_VALUES),
          errors: {}
    }
  }

  handleChange(e) {
    const target = e.target
    const value = target.value
    const name = target.name
    this.setState((prevState) => {
        prevState.product[name] = value
        return { product: prevState.product }
    })
  }

  handleSave(e) {
      this.props.onSave(this.state.product);
      // reset the form values to blank after submitting
      this.setState({
          product: Object.assign({}, RESET_VALUES), 
          errors: {}
      })
      // prevent the form submit event from triggering an HTTP Post
      e.preventDefault()
  }

  render () {
    return (
        <form>
            <label>Category</label>
            <input type="text" name="category" onChange={this.handleChange} value={this.state.product.category} /><br /> 
            <label>Price Per Unit </label> 
            <input type="text" name="price" onChange={this.handleChange} value={this.state.product.price} /><br /> 
            <label>Product Name </label> 
            <input type="text" name="name" onChange={this.handleChange} value={this.state.product.name} /><br /> 
            <label>Image URL </label> 
            <input type="text" name="image" onChange={this.handleChange} value={this.state.product.image} /><br /> 
            <input type="submit" value="Add Product" onClick={this.handleSave}></input>
        </form>
    )
  }
}

var contentNode = document.getElementById('root');
var inventory = <div>
  <h1> My Company Inventory </h1>
  <h3> Showing all available products </h3>
  <hr/>
  <ProductList/>
</div>
ReactDOM.render(inventory, contentNode);