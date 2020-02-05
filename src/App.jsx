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
  }
  render() {
    return (
      <ProductTable products={this.state.products}/>
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

var contentNode = document.getElementById('root');
var inventory = <div>
  <h1> My Company Inventory </h1>
  <h3> Showing all available products </h3>
  <hr/>
  <ProductList/>
  <h3> Add a new product to inventory </h3>
  <hr/>
</div>
ReactDOM.render(inventory, contentNode);