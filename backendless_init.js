var APPLICATION_ID = "6F83A085-A972-4DC7-FF96-F2B7E8BD9D00";
var SECRET_KEY = "6B15C60F-C980-0CF4-FF83-C46F8ED3E600";
var VERSION = "v1";

Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);

/*var user = new Backendless.User();
user.user_id = "disambas";
user.password = "secret";
var new_user = Backendless.UserService.register(user);*/

/* Food Store object */
function FoodStore(args)
{
	args = args || {};
	this.food = args.food || "";
	this.country = args.country || "";
}

/*var dataStore = Backendless.Persistence.of(FoodStore);
var foodStoreObject = new FoodStore({food:"pizza", country:"italy"})  
var new_food_store = dataStore.save( foodStoreObject );
console.log("Food Store saved successfully");
console.log(new_food_store);*/

/* Game Tracker */
function Tracker(args)
{
	args = args || {};
	this.user_id = args.user_id || "";
	this.question_id = args.question_id || "";
}


/*dataStore = Backendless.Persistence.of(Tracker);
var trackerObject = new Tracker({user_id:new_user.objectId, question: question_id});
var new_tracker= dataStore.save(trackerObject);
console.log("Tracer saved successfully");
console.log(new_tracker);*/

/* Scores -not used anymore*/
function Score(args)
{
	args = args || {};
	this.user_id = args.user_id || "";
	this.score = args.score || "";
}

/*dataStore = Backendless.Persistence.of(Score);
var scoreObject = new Score({user_id:new_user.objectId, score:10});
var new_score = dataStore.save(scoreObject);
console.log("Score saved successfully");
console.log(new_score);*/

if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}