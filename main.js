//     Declare variables
var tacos = -50; // Number of tacos the player has
var key = "give tacos please?"; // Keyword to type to get tacos
var received = 1; // Number of tacos to give the player when they type the key
var password = "debug"; // Admin console password
var progress = 0; // Current progress in the game
var tmsBought = 1; // Number of taco machines the player has purchased
var appliancesBought = 1;
var goldenLoresBought = 1;
var spookyShellsBought = 1;
var ghostAnger = 3; //The current anger level the BOOlean Ghost has with the player.
var goldCounter = -1; //Indicates how many more times the player has of doubled taco production left when they get the golden taco event.
var debugKey = false; //Indicates weather the normal key sysstem has been overiden to a custom debug key so the game does not continue to generate keys.

// Define the start function
function start() {
  //Print a welcome message
  println("       WELCOME TO tacoTyper!");
  println("   (You are currently playing V0.5.1)");
  println(" ");
  println(" ");
  println("      Latest changes:");
  println("Fixed the golden taco event so it runs normally. (Known bug: once you have gotten all 50 taco multipliers from the event the 51st prompt incorrectly states that you will still be receiving 2x the normal tacos even though only one is awarded to you. After this however, the game displays as normal), fixed the key select which was checking for an invalid variable in order to see if a key should be generated, fixed logic around multiplying and dividing the tacos received amount during the golden taco event, fixed not being able to set your tacos to receive in the debug console, changed formatting for initial launch of the game to look more aesthetically pleasing.");
  println(" ");
  println(" ");
  println(" ");

  // Run the game loop indefinitely
  while (true) {
    // Prompt the player to type the key or q to quit
    print("Type \"" + key + "\" to get ");
    if(goldCounter===0){
      print(received/2 + " ");
     } else if(goldCounter>0){
       print(received + " GOLDEN ");
      } else {
        print(received + " ");
      }
      print("tacos. You have " + tacos + " tacos in your balance. You are currently making " + tmsBought + " tacos passively per minute. Type shop to open the shop. Type q to quit. ");
var main = readLine("");
    // Check the player's input
    if (main === "q") {
      // If the player typed q, break out of the game loop
      println("Thanks for playing. We hope to see you again soon <3.");
      break;
    } else if (main === key) {
      // If the player typed the key, increase their taco balance by the number of tacos specified in the received variable
      if(goldCounter>0){
        tacos+=received;
        goldCounter--;
      } else if(goldCounter===0){
        received/=2;
        tacos+=received;
        goldCounter--;
      } else {
        tacos+=received;
      }
      encounters("default");
      keySelect();
    } else if (main === "shop") {
      // If the player typed "shop", open the shop window
      shop("default");
    } else if (main === password) {
      // If the player typed the debug console password, open the debug console
      debugConsole();
    } else if (main==="bal"){
      println("You currently have " + tacos + " tacos in your balance and you are making " + tmsBought + " tacos per minute.");
    }

    // Check if the player's taco balance is -25 and their progress is 0
    if (tacos === -25 && progress === 0) {
      // If the conditions are met, give the player a taco machine
      println("I love what you're doing here, lad and I see you're in a bit of a squash. Here, take a taco machine, it should make your life a bit easier.")
  // Increase the player's progress by 1
  progress++;
  keySelect();
} else if(tacos>0&&progress===1){
  println("The shop is now available! Your taco machine has also been upgraded!");
  progress++;
  keySelect();
  }
}
}

// Define the tacoIncrease function
function tacoIncrease() {
// Increase the player's taco balance by the specified number of tacos
tacos+=tmsBought;
println("+" + tmsBought + " tacos!");
}
// Define the shop function
function shop(behavior) {
// Check if the player has at least 1 taco
if (tacos > 0||behavior==="debug") {
// If the player has at least 1 taco, print a welcome message and open the shop window
println("Welcome to Tac O. Cat's shop!");
// Run the shop loop indefinitely
while (true) {
     // Print a message about the taco machine upgrade
  println("Tac O Cat's TM Upgrade (currently broken). Provides one taco every one minute. Cost: " + tmsBought*5 + " tacos. (Type [tac o upgrade] to purchase this upgrade.)");
  println("Appliance Upgrade: Gives you +1 more tacos every time you type to get tacos. Cost: " + appliancesBought*2 + " tacos. Type [Appliance Upgrade] to purchase it.");
  if(goldenLoresBought<12){

  println("Golden Taco lore. Increases the odds of getting a golden taco. Cost: " + goldenLoresBought*20 + " tacos. Type [Golden Lore] to purchase the upgrade");
  }else {
    println("Golden Lore: (out of stock)");
  }
  if(spookyShellsBought<8){
  println("Spooky Shell: Increases the odds of summoning the BOOlean ghost when you type to get tacos. Cost: " + spookyShellsBought*15 + " tacos. Type (Spooky Shell) to purchase the upgrade.");
  } else {
    println("Spooky Shell: (out of stock)");
  }
  // Prompt the player to type the name of an item they'd like to buy or "leave" to exit the shop
  var shopWindow = readLine("Type the name of an item you'd like to buy. Type leave to leave the shop. You currently have " + tacos + " tacos to spend.");
  // Check the player's input
  if (shopWindow === "leave") {
    // If the player typed "leave", break out of the shop loop
    println("Tac O Cat bows you from his shop and bid you return whenever you are in need of more wares.");
    break;
  } else if (shopWindow === "tac o upgrade") {
    if(tacos>=tmsBought*5) {
    tmsBought++;
    tacos -= tmsBought*5;
    setInterval(tacoIncrease,1);
    println("Purchase complete! You have purchased one of Tac O. Cat's TM upgrades for 5 tacos. +1 tacos per minute. You now have " + tacos + " tacos remaining.");
    } else {
      println("Error: you can't afford this upgrade. It costs " + tmsBought*5 + " but you only have " + tacos + ".");
    }
    } else if(shopWindow=="Golden Lore"){
      if(tacos>=goldenLoresBought*20&&goldenLoresBought<12){
      println("You have successfully purchased a golden taco lore. You now have " + goldenLoresBought-1 + ".");
      tacos-=goldenLoresBought*20;
      goldenLoresBought++;
      } else {
        println("Error: Either you have already purchased the maximum amount of golden lores or you have less than " + goldenLoresBought*20 + " tacos.");
      }
    } else if(shopWindow==="Appliance Upgrade"){
if(tacos>=appliancesBought*2){
  tacos-=appliancesBought*2;
      appliancesBought++;
      received++;
      println("Successfully purchased an appliance upgrade. You now have " + appliancesBought-1 + " appliance upgrades and " + tacos + " tacos in your balance.");
} else {
  println("Error: You don't have enough tacos. You have " + tacos + " and need " + appliancesBought*2 + " tacos.");
}
    } else if(shopWindow==="Spooky Shell"){
      if(tacos>=spookyShellsBought*15&&spookyShellsBought<8){
        tacos-=spookyShellsBought*15;
      spookyShellsBought++;
      println("Successfully purchased a spooky taco shell. You now have " + spookyShellsBought-1 + " spooky shells and " + tacos + " tacos in your balance.");
      } else {
        println("Error: either you have purchased the maximum amount of spooky shells or you don't have at least " + spookyShellsBought*15 + " tacos in your balance.");
      }
    }
}
} else {
    // If the player has 0 or fewer tacos, print a message and break out of the shop loop
    println("Tac O Cat sighs. You don't have any tacos to spend at his shop :(.");
    }
}

function debugConsole() {
// Prompt the player to choose an option from the admin console menu
var debug = readInt("With the power of the BOOlean Ghost you have unlocked the debug console! Type 1 to view your current game data, 2 to edit your taco balance, 3 to edit your progress number, 4 to edit the key, 5 to change the debug console password for this session, 6 to summon an encounter of your choice, 7 to forcefully open the shop window, or 8 to change the amount of tacos received when you enter the key.");
// Check the player's input
if (debug === 1) {
// If the player chose option 1, print a message containing all game data such as current progress, current balance, etc.
println("Your balance is currently " + tacos + " tacos, the game's key is currently set to " + key + ", your progress is currently set to " + progress + ", the ghost anger level is currently " + ghostAnger + ", you currently receive " + received + " tacos every time the key is entered, the gold counter is currently set to " + goldCounter + " and the debug console password is currently set to " + password + ".");
println("You currently have " + tmsBought + " Tac O upgrades, " + appliancesBought + " appliance upgrades, " + goldenLoresBought + " golden lores, and " + spookyShellsBought + " spooky shells.");
} else if (debug === 2) {
// If the player chose option 2, prompt them to enter a new taco balance and set their taco balance to the specified value
tacos = readInt("Type the number of tacos you'd like to set your balance to: ");
println("Your taco balance has now been set to " + tacos + " tacos.");
} else if (debug === 3) {
// If the player chose option 3, prompt them to enter a new progress value and set their progress to the specified value
progress = readInt("Type the number you'd like to set your progress to: ");
keySelect();
println("Your progress value has now been set to " + progress + ".");
 } else if (debug === 4) {
// If the player chose option 4, prompt them to enter a new key and set the key to the specified value
key = readLine("What would you like to change the key to? Type default to clear the admin key and restore original behavior.");
if(key!="default"){
debugKey = true;
println("Your debug key was successfully set to " + key + "");
} else {
  debugKey = false;
  keySelect();
  println("Debug key has been cleared. Original keys will now be used until a new debug key is set.");
}
} else if (debug === 5) {
// If the player chose option 5, prompt them to enter a new admin console password and set the password to the specified value
password = readLine("What would you like to change the debug console password to?");
println("The debug password was successfully changed to " + password + ".");
} else if(debug===6){
  var debugEncounter = readLine("Type the encounter keyword you'd like to summon. List: ghost, golden.");
  encounters(debugEncounter);
} else if (debug===7){
  println("Force opening the shop.");
  shop("debug");
} else if(debug===8){
  received = readInt("Type the new number of tacos you'd like to receive every time you enter the key.");
  println("You will now be given " + received + " tacos every time the key is entered.");
}
}

function encounters(encounterName) {
  var encounter = Randomizer.nextInt(1,2);
  if(encounter===1&&Randomizer.nextInt(1,31-spookyShellsBought)==1&&progress>0||encounterName==="ghost"){
  var ghost = readLine("The BOOlean Ghost appears in a puff of smoke! They tell you that if you type a boolean value (either true or false) you will be blessed with ??? from the BOOlean Ghost themself! If you dare type anything else and ignore the BOOlean Ghost something bad will happen!");
    if(ghost==="true"||ghost==="false"){
      received++;
      println("The BOOlean Ghost blesses your taco production.");
    } else {
      tacos-=ghostAnger*5;
      println("The BOOlean ghost angerly steals " + ghostAnger*5 + " tacos from you for ignoring them!");
      ghostAnger++;
    }
  } else if(encounter===2&&Randomizer.nextInt(1,46-goldenLoresBought)==1||encounterName=="golden") {
    keySelect();
      var goldenTaco = readLine("The golden taco appears! Type " + key + " to ignowledge it before it's gone!");
  if(goldenTaco===key){
    if(goldCounter<=0){
      received*=2;
    }
    if(goldCounter>-1){
      goldCounter+=50;
    } else {
      goldCounter+=51;
    }
    keySelect();
    tacos+=received;
    println("You got the golden taco! Taco production will be doubled for the next " + goldCounter + " times you make tacos!");
  } else {
    println("You missed the golden taco :(");
  }
} else if(encounter===3){
}
}

function keySelect(){
  if(debugKey===false){
  var plinkoWheel = Randomizer.nextInt(1,3);
    if(progress===0){
    if(plinkoWheel===1){
      key = "give tacos please?";
    } else if(plinkoWheel===2){
      key = "give tacos please.";
    } else {
      key = "give tacos please!";
    }
  } else if(progress===1||progress===2){
    if(plinkoWheel===1){
      key = "giveTacos;";
    } else if(plinkoWheel===2){
      key = "!!giveTacos;";
    } else { 
      key = "giveTacos(" + received + ");";
    }
  }
  }
}