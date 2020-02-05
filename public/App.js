const RESET_VALUES = {
  name: '',
  price: '',
  category: '',
  image: ''
};

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {
        1: {
          "name": "Blue Shirt",
          "price": "16.99",
          "category": "Shirts",
          "image": "https://ae01.alicdn.com/kf/HTB1IeK7d_tYBeNjy1Xdq6xXyVXaa.jpg"
        },
        2: {
          "name": "Logo Hat",
          "price": "12.99",
          "category": "Accessories",
          "image": "https://images.swag.com/convert/swag-prod/image-5d7f91e883338b0919bffe9d.png"
        },
        3: {
          "name": "Regular Fit Jeans",
          "price": "34.99",
          "category": "Jeans",
          "image": "https://i5.walmartimages.com/asr/a0b2a844-1c46-4d92-8640-4322ebe807f1_1.14b61b891d76f250f38515149d2daf75.jpeg"
        }
      },
      formData: null
    };
  }

  render() {
    return React.createElement(ProductTable, {
      products: this.state.products
    });
  }

}

class ProductRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement("tr", null, React.createElement("td", null, " ", this.props.product.name || ' ', " "), React.createElement("td", null, " ", this.props.product.price || ' ', " "), React.createElement("td", null, " ", this.props.product.category || ' ', " "), React.createElement("td", null, " ", React.createElement("a", {
      href: this.props.product.image || '#',
      target: "__blank"
    }, " View "), " "));
  }

}

class ProductTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rows = Object.keys(this.props.products).map(id => {
      const productInfo = this.props.products[id] || {};
      return React.createElement(ProductRow, {
        key: id,
        product: productInfo
      });
    });
    return React.createElement("table", null, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, " Product Name "), React.createElement("th", null, " Price "), React.createElement("th", null, " Category "), React.createElement("th", null, " Image "))), React.createElement("tbody", null, rows));
  }

}

var contentNode = document.getElementById('root');
var inventory = React.createElement("div", null, React.createElement("h1", null, " My Company Inventory "), React.createElement("h3", null, " Showing all available products "), React.createElement("hr", null), React.createElement(ProductList, null), React.createElement("h3", null, " Add a new product to inventory "), React.createElement("hr", null));
ReactDOM.render(inventory, contentNode);