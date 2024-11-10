let app1 = new Vue({
    el: '#app1',
    data: {
        clubs: [
            {
                id: 1,
                subject: 'Maths',
                location: 'Hendon Central Library',
                currency: '£',
                price: '40',
                image: '../images/calc.png',
                availableSeats: 10
            },
            {
                id: 2,
                subject: 'English',
                location: 'Brent Cross Nursery',
                currency: '£',
                price: '60',
                image: '../images/book.svg',
                availableSeats: 1
            },
            {
                id: 3,
                subject: 'Science',
                location: 'Golders Green High School',
                currency: '£',
                price: '45',
                image: '../images/atom.png',
                availableSeats: 15
            },
            {
                id: 4,
                subject: 'Art',
                location: 'Hampstead Heath Centre',
                currency: '£',
                price: '30',
                image: '../images/paint.svg',
                availableSeats: 3
            },
            {
                id: 5,
                subject: 'Music',
                location: 'Finchley Music School',
                currency: '£',
                price: '50',
                image: '../images/music.svg',
                availableSeats: 10
            },
            {
                id: 6,
                subject: 'Drama',
                location: 'London Bridge Theatre',
                currency: '£',
                price: '35',
                image: '../images/drama.svg',
                availableSeats: 15
            }
        ],
        order: {
            firstName: "",
            lastName: "",
            telephone: "",
            email: "",
            city: "",
            postcode: ""
        },
        sortBy: "",
        orderBy: "",
        checkOutMenu: false,
        cart: [1,2,1,1],
        searchQuery: ""
    },
    methods: {
        canAddToCart: function (club) {
            return club.availableSeats > this.seatCount(club.id);
        },
        addToCart: function (id) {
            this.cart.push(id);
            console.log("added to cart");
        },
        toggleCheckOutMenu: function () {
            this.checkOutMenu = !this.checkOutMenu;
            console.log("toggled checkout menu");
        },
        removeFromCart: function (id) {
            const index = this.cart.indexOf(id);
            if (index > -1) {
                this.cart.splice(index, 1);
            }
            if (this.cart.length == 0) {
                this.toggleCheckOutMenu();
            }
            console.log("removed from cart");
        },
        seatCount: function (id) {
            let seatCount = 0;
            for (let index = 0; index < this.cart.length; index++) {
                if (this.cart[index] == id) {
                    seatCount++;
                }
            }
            return seatCount;
        },
        checkout: function () {
            if (this.order.firstName == "" || this.order.lastName == "" || this.order.telephone == "" || this.order.email == "" || this.order.city == "" || this.order.postcode == "") {
                alert("Please fill in all fields.");
                return;
            } else {
                alert("Thank you for your purchase!");
                console.log("checkout");
                console.log(this.order.firstName);
                console.log(this.cartItems.length);
                console.log(this.fullprice);
                this.cart = [];
                this.order = {
                    firstName: "",
                    lastName: "",
                    telephone: "",
                    email: "",
                    city: "",
                    postcode: ""
                };
                for (int = 0; int < this.clubs.length; int++) {
                    this.clubs[int].availableSeats = this.clubs[int].availableSeats - this.seatCount(this.clubs[int].id);
                }
                this.toggleCheckOutMenu();
            }
        },
        sortByTitle: function () {
            this.sortBy = "title";
            console.log("sorted by title");
        },
        sortByPrice: function () {
            this.sortBy = "price";
            console.log("sorted by price");
        },
        sortByLocation: function () {
            this.sortBy = "location";
            console.log("sorted by location");
        },
        sortByAvailability: function () {
            this.sortBy = "availability";
            console.log("sorted by availability");
        },
        orderByAscending: function () {
            this.orderBy = "ascending";
            console.log("ordered by ascending");
        },
        orderByDescending: function () {
            this.orderBy = "descending";
            console.log("ordered by descending");
        }
    },
    computed: {
        searchIsEmpty: function () {
            if (this.searchQuery == "") {
                return true;
            } else {
                return false;
            }
        },
        searchItems: function () {
            let searchItems = [];
            for (let index = 0; index < this.clubs.length; index++) {
                if (this.clubs[index].subject.toLowerCase().includes(this.searchQuery.toLowerCase())) {
                    searchItems.push(this.clubs[index]);
                }
            }
            return searchItems;
        },
        cartItemCount: function () {
            if (this.cart.length > 0) {
                return this.cart.length;
            } else {
                return '';
            }
        },
        cartEmpty: function () {
            if (this.cart.length > 0) {
                return true;
            } else {
                return false;
            }
        },
        cartItems: function () {
            let cartItems = [];
            for (let index = 0; index < this.clubs.length; index++) {
                for (let index2 = 0; index2 < this.cart.length; index2++) {
                    if (this.clubs[index].id == this.cart[index2]) {
                        cartItems.push(this.clubs[index]);
                    }
                }
            }
            return cartItems;
        },
        uniqueCartItems: function () {
            let uniqueCartItems = [];
            for (let index = 0; index < this.cartItems.length; index++) {
                if (!uniqueCartItems.includes(this.cartItems[index])) {
                    uniqueCartItems.push(this.cartItems[index]);
                }
            }
            return uniqueCartItems;
        },
        fullprice: function () {
            let fullprice = 0;
            for (let index = 0; index < this.cartItems.length; index++) {
                fullprice = fullprice + parseInt(this.cartItems[index].price);
            }
            return fullprice;
        },
        allClubs: function () {
            let allClubs = this.clubs;
            if (this.sortBy == "title") {
                allClubs.sort((a, b) => a.subject.localeCompare(b.subject));
            } else if (this.sortBy == "price") {
                allClubs.sort((a, b) => a.price - b.price);
            } else if (this.sortBy == "location") {
                allClubs.sort((a, b) => a.location.localeCompare(b.location));
            } else if (this.sortBy == "availability") {
                allClubs.sort((a, b) => a.availableSeats - b.availableSeats);
            }
            if (this.orderBy == "descending") {
                allClubs.reverse();
            }
            return allClubs;
        }
    }
})