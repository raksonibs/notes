## Improving Large Rails Apps with Service Objects
### Aaron Lasseigne

- code in controller growsssss
- so put it in model, ad then more modules
- and custom shit gets blocked
- service object! 
- ActiveModel wants to represent a record. It wants to map to a table and persist data. It influences the way you think about models. It makes you think of them as nouns.
- Before long, each noun is a mass of business logic. Some interactions spread across models making them difficult to wrap your head around. Service objects fix this. They’re models that are designed to be verbs.
- You could use plain old Ruby objects. I wanted my objects to feel like a part of Rails. I wanted a sibling to ActiveModel. I wanted the team to have a consistent approach. This led to the creation of ActiveInteraction.
- SignUp.run(
  client: Client.find(1),
  name: 'Aaron',
  email: 'aaron.lasseigne@gmail.com',
  password: 'supersecure'
)
- SignUp.run(params.merge(client: current_client))

class SignUp < ActiveInteraction::Base
  object :client
  string :name, :email, :password

  def execute
    user = User.create(
      client: client,
      name: name,
      email: email,
      password: password
    )

    if user.valid?
      Notifications.welcome(user).deliver
    else
      errors.merge!(user.errors)
    end

    user
  end
end

- First, there is a check to see if all the necessary arguments were passed. In SignUp that means a :client (an instance of Client), :name, :email, and :password. They need to be the right type or convertible to the right type. If you mark a field as a date and provide a String it will convert to a Date. You can also indicate optional arguments.

def new
  @sign_up = SignUp.new
end

def create
  @sign_up = SignUp.run(params[:user])

  if @sign_up.valid?
    user = @sign_up.result
    redirect_to(user)
  else
    render 'new'
  end
end

- simple add custom features, rather than crazy model attributes

class SignUp < ActiveInteraction::Base
   object :client
   string :name, :email, :password
+  boolean :notify,
+    default: true

   def execute
     user = User.create(
       client: client,
       name: name,
       email: email,
       password: password
     )

     if user.valid?
+      if notify
         Notifications.welcome(user).deliver
+      end
     else
       errors.merge!(user.errors)
     end

     user
   end
 end