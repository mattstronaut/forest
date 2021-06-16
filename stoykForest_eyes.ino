#include <SoftwareSerial.h>
#include <Wire.h>


const int doaddress=100; //pre-configured DO Circuit Address
const int orpaddress=101; //Pre-configured ORP Circuit Address
const int ecaddress=102; //Pre-Configured EC Circuit Address
const int phaddress=103; //Pre-Configured Ph Circuit Address

char dodata[30];
char orpdata[30];
char ecdata[30];
char phdata[30];
float tempdata;

int time_=2000;
byte code=0;             //used to hold I2C Response code
byte in_char=0;          //used to store incoming bytes from pH circuit
int i=0;                //counter for arrays



void setup() {
  Serial.begin(9600); //start serial connection
  Wire.begin(); //start I2C
  //pinMode(2, OUTPUT); //set digital pin 2 as the output to turn temp sensor on and off 
}

void loop() {
  
  sensor_poll(doaddress, dodata, 'r');
  delay(200);
  sensor_poll(orpaddress, orpdata, 'r');
  delay(200);
  sensor_poll(ecaddress, ecdata, 'r');
  delay(200);
  sensor_poll(phaddress, phdata, 'r');
  
  

  //This code forms the do, orp, ec, ph, water level, and temperature data into a JSON-formatted string

  String jsonEyesData = "{\"do\":\"";
  jsonEyesData += dodata;
  jsonEyesData += "\",\"orp\":\"";
  jsonEyesData += orpdata;
  jsonEyesData += "\",\"ec\":\"";
  jsonEyesData += ecdata;
  jsonEyesData += "\",\"ph\":\"";
  jsonEyesData += phdata;
  jsonEyesData += "\"}"; //final element of string
  Serial.flush();
  Serial.println(jsonEyesData); //send the whole line off to forest

//void readingline(){
//  Serial.println("___________________");
//}

//void intro() { //this is for messages to be displayed over the serial connection at instantiation  
//  Serial.flush();
//  Serial.println( F("The following are values from each sensor (DO, ORP, EC, pH, temp)."));
//  Serial.println( F("Someday this will output to a file for data visulization and remote logging,")); 
//  Serial.println("and include an interface for manually polling sensors.");
//}

void sensor_poll(int address, char *arrayname, char com){ //this will fill a given character array sensor data."cmd" is usually "R"
  float reading;
  tempdata = read_temp();  //turns on and reads the temperature sensor then sets tempdata to the converted output
  
  Wire.beginTransmission(address); //creates a connection to the specified EZO
  // Wire.write("T",tempdata); //This is a problem. We need to be able to transmit floats with Wire
  Wire.endTransmission();
  delay (time_);
  
  Wire.beginTransmission(address); //creates a connection to the specified EZO
  Wire.write(com);
  Wire.endTransmission();
  delay(time_); //most EZOs require 1 second after read command

  Wire.requestFrom(address,30,1);
  code=Wire.read();

  while(Wire.available()){ //while there are bytes to be read
    in_char = Wire.read(); //receive a byte
    arrayname[i]= in_char;
    i++;
      if(in_char==0){ //if we have received a null result from the EZO, meaning the end of it's report
        i=0; //reset the counter
        Wire.endTransmission(); //end the I2C transmission
        break; //exit the while loop
      }
  }
}

float read_temp(void){
  float v_out; //voltage out from sensor
  float temp;  //storage for final temperature

  digitalWrite(A0, LOW);  //set pull-up on analog pin

  digitalWrite(2, HIGH);  //this turns on the temp sensor
  delay(2);  //gives the sensor a chance to warm up
  v_out = analogRead(0);
  digitalWrite(2,LOW);

  v_out*=.0048;  //multiplies output by .0048 which is how many volts each ADC point is in a 5 Volt System, .0029 in a 3v

  v_out*=1000; //converts volts to milivolts

  temp = 0.0512 * v_out - 20.5128;  //this is the equation to output the temp in celcius

  return temp;
}





