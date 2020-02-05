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
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(product) {
    this.setState(prevState => {
      let products = prevState.products;
      products[Math.floor(Math.random() * 1000000 + 1)] = product;
      return {
        products
      };
    });
  }

  render() {
    return React.createElement("div", null, React.createElement(ProductTable, {
      products: this.state.products
    }), React.createElement("h3", null, " Add a new product to inventory "), React.createElement("hr", null), React.createElement(ProductForm, {
      key: JSON.stringify(this.state.formData || {}),
      formInput: this.state.formData,
      onSave: this.handleSave
    }));
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

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      product: this.props.formInput || Object.assign({}, RESET_VALUES),
      errors: {}
    };
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState(prevState => {
      prevState.product[name] = value;
      return {
        product: prevState.product
      };
    });
  }

  handleSave(e) {
    this.props.onSave(this.state.product); // reset the form values to blank after submitting

    this.setState({
      product: Object.assign({}, RESET_VALUES),
      errors: {}
    }); // prevent the form submit event from triggering an HTTP Post

    e.preventDefault();
  }

  render() {
    return React.createElement("form", null, React.createElement("label", null, "Category"), React.createElement("input", {
      type: "text",
      name: "category",
      onChange: this.handleChange,
      value: this.state.product.category
    }), React.createElement("br", null), React.createElement("label", null, "Price Per Unit "), React.createElement("input", {
      type: "text",
      name: "price",
      onChange: this.handleChange,
      value: this.state.product.price
    }), React.createElement("br", null), React.createElement("label", null, "Product Name "), React.createElement("input", {
      type: "text",
      name: "name",
      onChange: this.handleChange,
      value: this.state.product.name
    }), React.createElement("br", null), React.createElement("label", null, "Image URL "), React.createElement("input", {
      type: "text",
      name: "image",
      onChange: this.handleChange,
      value: this.state.product.image
    }), React.createElement("br", null), React.createElement("input", {
      type: "submit",
      value: "Add Product",
      onClick: this.handleSave
    }));
  }

}

var contentNode = document.getElementById('root');
var inventory = React.createElement("div", null, React.createElement("h1", null, " My Company Inventory "), React.createElement("h3", null, " Showing all available products "), React.createElement("hr", null), React.createElement(ProductList, null));
ReactDOM.render(inventory, contentNode);