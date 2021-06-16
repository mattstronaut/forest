#define RELAY16 30

void setup() {
  pinMode(RELAY16, OUTPUT);
}

void loop() {
  digitalWrite(RELAY16,LOW);
  delay(2000);
  digitalWrite(RELAY16,HIGH);
  delay(2000);
}
