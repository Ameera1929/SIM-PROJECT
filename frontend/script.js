// ========================
// SIGNUP PAGE
// ========================

const signupForm = document.querySelector(".signup form");

if (signupForm) {


signupForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username =
        document.getElementById("username").value.trim();

    const email =
        document.getElementById("email").value.trim();

    if (!username || !email) {
        alert("All fields are required");
        return;
    }

    try {

        const res = await fetch(
            "http://localhost:5000/auth/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email
                })
            }
        );

        const data = await res.json();

        if (data.success) {

            localStorage.setItem(
                "signupUsername",
                username
            );

            localStorage.setItem(
                "signupEmail",
                email
            );

            alert("OTP sent successfully");

            window.location.href =
                "otp.html";

        } else {

            alert(data.message);
        }

    } catch (err) {

        console.error(err);
        alert("Server Error");
    }

});


}

// ========================
// OTP PAGE
// ========================

const otpForm =
document.getElementById("otpForm");

if (otpForm) {


otpForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const email =
            localStorage.getItem(
                "signupEmail"
            );

        const otp =
            document.getElementById(
                "otp"
            ).value.trim();

        try {

            const res =
                await fetch(
                    "http://localhost:5000/auth/verify-otp",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            email,
                            otp
                        })
                    }
                );

            const data =
                await res.json();

            if (data.success) {

                alert(
                    "OTP Verified Successfully"
                );

                window.location.href =
                    "password.html";

            } else {

                alert(data.message);
            }

        } catch (err) {

            console.error(err);

            alert(
                "Server Error"
            );
        }

    }
);


}

// ========================
// PASSWORD PAGE
// ========================

const passwordForm =
document.getElementById(
"passwordForm"
);

if (passwordForm) {


passwordForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const password =
            document.getElementById(
                "password"
            ).value;

        const confirmPassword =
            document.getElementById(
                "confirmPassword"
            ).value;

        if (
            password !== confirmPassword
        ) {

            alert(
                "Passwords do not match"
            );

            return;
        }

        const username =
            localStorage.getItem(
                "signupUsername"
            );

        const email =
            localStorage.getItem(
                "signupEmail"
            );

        try {

            const res =
                await fetch(
                    "http://localhost:5000/auth/create-password",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            username,
                            email,
                            password
                        })
                    }
                );

            const data =
                await res.json();

            if (data.success) {

                alert(
                    "Account Created Successfully"
                );

                localStorage.removeItem(
                    "signupUsername"
                );

                localStorage.removeItem(
                    "signupEmail"
                );

                window.location.href =
                    "login.html";

            } else {

                alert(data.message);
            }

        } catch (err) {

            console.error(err);

            alert(
                "Server Error"
            );
        }

    }
);


}

// ========================
// LOGIN PAGE
// ========================

const loginForm =
document.querySelector(
".signin form"
);

if (loginForm) {


loginForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const username =
            document.getElementById(
                "loginUsername"
            ).value.trim();

        const password =
            document.getElementById(
                "loginPassword"
            ).value;

        try {

            const res =
                await fetch(
                    "http://localhost:5000/auth/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            username,
                            password
                        })
                    }
                );

            const data =
                await res.json();

            if (data.success) {

                localStorage.setItem(
                    "token",
                    data.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        data.user
                    )
                );

                window.location.href =
                    "dashboard.html";

            } else {

                alert(
                    data.message
                );
            }

        } catch (err) {

            console.error(err);

            alert(
                "Server Error"
            );
        }

    }
);


}

// ========================
// DASHBOARD PAGE
// ========================

const welcome =
    document.getElementById("welcome");

const token = localStorage.getItem("token");

if (
    window.location.pathname.includes("dashboard.html")
) {

    if (!token) {

        alert("Please Login First");

        window.location.href = "login.html";

    }

}
 



if (welcome) {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    if (user) {

        welcome.innerText =
            `Welcome ${user.username}`;

    }

}

function logout() {


localStorage.clear();

window.location.href =
    "login.html";


}


// ========================
// PRODUCTS PAGE
// ========================

const productForm =
document.getElementById("productForm");

const productList =
document.getElementById("productList");

const showFormBtn =
document.getElementById("showFormBtn");

const productFormContainer =
document.getElementById("productFormContainer");

const currentUser =
JSON.parse(localStorage.getItem("user"));

if(
    showFormBtn &&
    currentUser &&
    currentUser.role !== "customer_admin"
){
    showFormBtn.style.display = "none";
}


// SHOW / HIDE FORM

if(showFormBtn && productFormContainer){

    showFormBtn.addEventListener(
        "click",
        ()=>{

            if(
                productFormContainer.style.display === "none" ||
                productFormContainer.style.display === ""
            ){

                productFormContainer.style.display =
                "block";

            }else{

                productFormContainer.style.display =
                "none";

            }

        }
    );

}

// LOAD PRODUCTS
let allProducts = [];

if(productList){
    loadProducts();

}

async function loadProducts(){

    try{

        const res =
        await fetch(
            "http://localhost:5000/products/all",
            {
                headers:{
                    Authorization:
                    `Bearer ${token}` 
                }     
        
            }
        );

        const data =
        await res.json();

        if(data.success){

            productList.innerHTML = "";
            allProducts = data.products;
            
            const currentUser =
            JSON.parse(localStorage.getItem("user"));
            
            data.products.forEach(
                (product)=>{

                    productList.innerHTML += `

                    <tr>
                        <td style="padding:10px;border:1px solid #00d4ff;">
                            ${product.name}
                        </td>

                        <td style="padding:10px;border:1px solid #00d4ff;">
                            ${product.sku}
                        </td>

                        <td style="padding:10px;border:1px solid #00d4ff;">
                            ${product.category}
                        </td>

                        <td style="padding:10px;border:1px solid #00d4ff;">
                            ₹${product.price}
                        </td>

                        <td style="padding:10px;border:1px solid #00d4ff; color:${product.quantity < 10 ? 'red' : '#00ff88'};font-weight:bold; ">
                            ${product.quantity}
                            ${product.quantity < 10 ? '⚠ Low Stock' : ''}
                        </td>

                        <td style="padding:10px;border:1px solid #00d4ff;">
                            ${product.description || "-"}
                        </td>

                        <td style="padding:10px;border:1px solid #00d4ff;">

                            ${
                                currentUser.role === "customer_admin"
                                ?
                                `
                                <button
                                onclick="editProduct('${product._id}')">

                                Edit

                                </button>

                                <button
                                onclick="deleteProduct('${product._id}')">

                                Delete

                                </button>
                                `
                                :
                                "-"
                            }

                        </td>
                    </tr>

                    `;

                }
            );

        }

    }catch(error){

        console.log(error);

    }

}


// SAVE PRODUCT

if(productForm){

    productForm.addEventListener(
        "submit",
        async(e)=>{

            e.preventDefault();

            const editId =
            document.getElementById("editId").value;
            
            const productData = {

                name:
                document.getElementById("name").value,

                sku:
                document.getElementById("sku").value,

                category:
                document.getElementById("category").value,

                price:
                document.getElementById("price").value,

                quantity:
                document.getElementById("quantity").value,

                description:
                document.getElementById("description").value

            };

            try{

                const res =
                await fetch(

                    editId
                    ? `http://localhost:5000/products/update/${editId}`
                    : "http://localhost:5000/products/create",

                    {           
                        method:
                        editId ? "PUT" : "POST",

                        headers:{
                            "Content-Type":
                            "application/json",

                            Authorization:
                            `Bearer ${token}`
                        },

                        body:JSON.stringify(
                            productData
                        )
                    }
                );

                const data =
                await res.json();

                if(data.success){

                    alert(
                    editId    
                    ?  "Product Updated Successfully"
                    :  "Product Added Successfully"
                    );

                    productForm.reset();
                    document.getElementById(
                    "editId"
                    ).value = "";

                    loadProducts();

                    if(productFormContainer){

                        productFormContainer.style.display =
                        "none";

                    }

                }else{

                    alert(
                        data.message
                    );

                }

            }catch(error){

                console.log(error);

                alert(
                    "Server Error"
                );

            }

        }
    );

}

async function deleteProduct(id){

    const confirmDelete =
    confirm(
        "Delete this product?"
    );

    if(!confirmDelete){
        return;
    }

    try{

        const res =
        await fetch(
            `http://localhost:5000/products/delete/${id}`,
            {
                method:"DELETE",
                headers:{
                     Authorization:
                     `Bearer ${token}`
                }     
            }
        );

        const data =
        await res.json();

        if(data.success){

            alert(
                "Product Deleted Successfully"
            );

            loadProducts();

        }else{

            alert(data.message);

        }

    }catch(error){

        console.log(error);

    }

}

function editProduct(id){

    const row =
    event.target.parentElement.parentElement;

    document.getElementById("editId").value =
    id;

    document.getElementById("name").value =
    row.cells[0].innerText;

    document.getElementById("sku").value =
    row.cells[1].innerText;

    document.getElementById("category").value =
    row.cells[2].innerText;

    document.getElementById("price").value =
    row.cells[3].innerText.replace("₹","");

    document.getElementById("quantity").value =
    row.cells[4].innerText;

    document.getElementById("description").value =
    row.cells[5].innerText;

    

    productFormContainer.style.display =
    "block";

}

const totalProducts =
document.getElementById(
    "totalProducts"
);

if(totalProducts){

    loadDashboardStats();

}

async function loadDashboardStats(){

    try{

        const res =
        await fetch(
            "http://localhost:5000/products/stats",
            {
                headers:{
                    Authorization:
                    `Bearer ${token}`
                }
            }    
        );

        const data =
        await res.json();

        if(data.success){

            document.getElementById(
                "totalProducts"
            ).innerText =
            data.totalProducts;

            document.getElementById(
                "totalStock"
            ).innerText =
            data.totalStock;

            document.getElementById(
                "lowStock"
            ).innerText =
            data.lowStock;

        }

    }catch(error){

        console.log(error);

    }

}

const searchInput =
document.getElementById(
    "searchProduct"
);

if(searchInput){

    searchInput.addEventListener(
        "keyup",
        ()=>{

            const keyword =
            searchInput.value
            .toLowerCase();

            productList.innerHTML = "";

            allProducts
            .filter(product =>

                product.name
                .toLowerCase()
                .includes(keyword)

                ||

                product.sku
                .toLowerCase()
                .includes(keyword)

                ||

                product.category
                .toLowerCase()
                .includes(keyword)

            )
            .forEach(product => {

                productList.innerHTML += `

                <tr>

                    <td style="padding:10px;border:1px solid #00d4ff;">
                        ${product.name}
                    </td>

                    <td style="padding:10px;border:1px solid #00d4ff;">
                        ${product.sku}
                    </td>

                    <td style="padding:10px;border:1px solid #00d4ff;">
                        ${product.category}
                    </td>

                    <td style="padding:10px;border:1px solid #00d4ff;">
                        ₹${product.price}
                    </td>

                    <td style="padding:10px;border:1px solid #00d4ff;">
                        ${product.quantity}
                    </td>

                </tr>

                `;

            });

        }
    );

}

// ========================
// USERS PAGE
// ========================



const userForm =
document.getElementById("userForm");

const userList =
document.getElementById("userList");

const showUserFormBtn =
document.getElementById("showUserFormBtn");

const userFormContainer =
document.getElementById("userFormContainer");


// SHOW / HIDE FORM

if(showUserFormBtn && userFormContainer){

    showUserFormBtn.addEventListener(
        "click",
        ()=>{

            if(
                userFormContainer.style.display === "none" ||
                userFormContainer.style.display === ""
            ){

                userFormContainer.style.display =
                "block";

            }else{

                userFormContainer.style.display =
                "none";

            }

        }
    );

}


// LOAD USERS

if(userList){

    loadUsers();

}

async function loadUsers(){

    try{

        const res =
        await fetch(
            "http://localhost:5000/auth/users",
            {
                headers:{
                    Authorization:
                    `Bearer ${token}`
                }
            }
        );

        const data =
        await res.json();

        if(data.success){

            userList.innerHTML = "";

            data.users.forEach(
                (user)=>{

                    userList.innerHTML += `

                    <tr>

                        <td style="padding:10px;border:1px solid #00d4ff;">
                            ${user.username}
                        </td>

                        <td style="padding:10px;border:1px solid #00d4ff;">
                            ${user.email}
                        </td>

                        <td style="padding:10px;border:1px solid #00d4ff;">
                            ${user.role}
                        </td>

                        <td style="padding:10px;border:1px solid #00d4ff;">

                            <button
                            onclick="editUser('${user._id}')">

                            Edit

                            </button>

                            <button
                            onclick="deleteUser('${user._id}')">

                            Delete

                            </button>

                        </td>

                    </tr>

                    `;

                }
            );

        }else{

            alert(data.message);

        }

    }catch(error){

        console.log(error);

    }

}


// UPDATE USER

if(userForm){

    userForm.addEventListener(
        "submit",
        async(e)=>{

            e.preventDefault();

            const editId =
            document.getElementById(
                "editUserId"
            ).value;

            if(!editId){

                alert(
                    "Please select a user to edit"
                );

                return;

            }

            const userData = {

                username:
                document.getElementById(
                    "username"
                ).value,

                email:
                document.getElementById(
                    "email"
                ).value,

                role:
                document.getElementById(
                    "role"
                ).value

            };

            try{

                const res =
                await fetch(
                    `http://localhost:5000/auth/update/${editId}`,
                    {
                        method:"PUT",
                        headers:{
                            "Content-Type":
                            "application/json",

                            Authorization:
                            `Bearer ${token}`
                        },
                        body:JSON.stringify(
                            userData
                        )
                    }
                );

                const data =
                await res.json();

                if(data.success){

                    alert(
                        "User Updated Successfully"
                    );

                    userForm.reset();

                    document.getElementById(
                        "editUserId"
                    ).value = "";

                    userFormContainer.style.display =
                    "none";

                    loadUsers();

                }else{

                    alert(data.message);

                }

            }catch(error){

                console.log(error);

            }

        }
    );

}


// EDIT USER

function editUser(id){

    const row =
    event.target.parentElement.parentElement;

    document.getElementById(
        "editUserId"
    ).value = id;

    document.getElementById(
        "username"
    ).value = row.cells[0].innerText;

    document.getElementById(
        "email"
    ).value = row.cells[1].innerText;

    document.getElementById(
        "role"
    ).value = row.cells[2].innerText;

    userFormContainer.style.display =
    "block";

}


// DELETE USER

async function deleteUser(id){

    const confirmDelete =
    confirm(
        "Delete this user?"
    );

    if(!confirmDelete){

        return;

    }

    try{

        const res =
        await fetch(
            `http://localhost:5000/auth/delete/${id}`,
            {
                method:"DELETE",

                headers:{
                    Authorization:
                    `Bearer ${token}`
                }
            }
        );

        const data =
        await res.json();

        if(data.success){

            alert(
                "User Deleted Successfully"
            );

            loadUsers();

        }else{

            alert(data.message);

        }

    }catch(error){

        console.log(error);

    }


}
