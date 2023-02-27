import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Directive, Injectable } from '@angular/core';

const options = {
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

private key:string='2459d4d3f54b054db2fbc122b4c2da39'

  constructor(private http: HttpClient) { }




  upload(file:any){
    const formData=new FormData()
    formData.append("image",file)
    return this.http.post('https://api.imgbb.com/1/upload',formData,{params:{key:this.key}})
  }
  
  

  signup(name: any, email: any, password: any) {
    const body = {
      name,
      email,
      password
    }

    return this.http.post('http://localhost:3000/admin-signup', body)
  }

  login(email: any, password: any) {
    const body = {
      email,
      password
    }
    // server call
    return this.http.post('http://localhost:3000/admin-login', body)
  }

  // function appending token for http header
  appendToken() {

    // fetch token from local storage
    const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken')

    // create http header
    var headers = new HttpHeaders()
    if (token) {
      // append token inside headers
      headers = headers.append('acces-token', token)
      options.headers = headers
    }
    return options
  }

  addProduct(name: any, category: any, price: any, description: any, imageUrl: any) {
    const body = {
      name,
      category,
      price,
      description,
      imageUrl

    }

    return this.http.post('http://localhost:3000/add-product', body, this.appendToken())
  }

  adminViewProducts() {
    return this.http.get('http://localhost:3000/admin-viewProducts')

  }

  ViewProductToEdit(productId: any) {
    return this.http.get('http://localhost:3000/view-product-to-edit/' + productId, this.appendToken())

  }

  editProduct(name: any, category: any, price: any, description: any, productId: any,imageUrl:any) {
    const body = {
      name,
      category,
      price,
      description,
      productId,
      imageUrl
    }
    return this.http.post('http://localhost:3000/edit-product', body, this.appendToken())
  }

  deleteProduct(productId: any) {
    return this.http.delete('http://localhost:3000/delete-product/' + productId, this.appendToken())

  }

  getUserOrders() {
    return this.http.get('http://localhost:3000/get-user-orders', this.appendToken())

  }

  shipOrders(orderId: any) {
    return this.http.get('http://localhost:3000/ship-orders/' + orderId, this.appendToken())

  }

  getUsreDetails() {
    return this.http.get('http://localhost:3000/get-user-details', this.appendToken())

  }







  // --------------------------------------------------------------------------------------------------------
  // user api

  userSignup(name: any, email: any, password: any) {
    const body = {
      name,
      email,
      password
    }

    return this.http.post('http://localhost:3000/user-signup', body)
  }

  userLogin(email: any, password: any) {
    const body = {
      email,
      password
    }
    // server call
    return this.http.post('http://localhost:3000/user-login', body)
  }

  addTocart(productId: any, userId: any) {
    const body = {
      productId,
      userId
    }
    return this.http.post('http://localhost:3000/add-to-cart', body, this.appendToken())
  }

  viewCart(userId: any) {
    return this.http.get('http://localhost:3000/view-cart/' + userId, this.appendToken())

  }

  getTotalAmount(userId: any) {
    return this.http.get('http://localhost:3000/view-totalAmount/' + userId, this.appendToken())
  }

  getCartCount(userId: any) {
    return this.http.get('http://localhost:3000/cart-count/' + userId, this.appendToken())

  }

  removeProductFromCart(cartId: any, productId: any) {
    const body = {
      cartId,
      productId,
    }
    return this.http.post('http://localhost:3000/remove-cartProduct', body, this.appendToken())
  }

  changeQuantity(cartId: any, productId: any, userId: any, count: any, quantity: any) {
    const body = {
      cartId,
      productId,
      userId,
      count,
      quantity
    }
    return this.http.post('http://localhost:3000/change-quantity', body)

  }

  placeOrder(orderDetails: any, total: any, userId: any) {
    const body = {
      details: orderDetails,
      total: total,
      userId: userId
    }
    return this.http.post('http://localhost:3000/place-order', body, this.appendToken())

  }

  getOrder(userId: any) {
    return this.http.get('http://localhost:3000/get-orders/' + userId, this.appendToken())

  }

  getOrderProducts(orderId: any) {
    return this.http.get('http://localhost:3000/get-order-products/' + orderId, this.appendToken())

  }

  getOrderDetails(orderId:any){
    return this.http.get('http://localhost:3000/get-delivery-details/' + orderId, this.appendToken())
 
  }

  viewposter(){
    return this.http.get('http://localhost:3000/view-poster')

  }


}