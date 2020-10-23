l = 0.057, g = 9.8, m1 = 0.83, m2 = 0.53, d = 0.000687;
I1 = 0.0047, I2 = 0.00048;
M = (m1*l+m2*l)*g;
I = I1 + m1 * l^2 + m2*l^2 + I2;
c=0.0014;
q1=pi/4, q1d=0, q1dd=0, q2=0, q2d=0, q2dd=0;
dt=0.01;

kp = 20;
kd = 0.2;

for i=1:1000;
u = -(kp * q1 + kd * q1d);

q1dd = (M*g*sin(q1) + (d-c)*q2d + u)/(I-I2);
q2dd = (-u + (c-d)*q2d)/I2 - q1dd;

q1d = q1d + dt*q1dd;
q2d = q2d + dt*q2dd;

q1 = q1 + dt*q1d;
q2 = q2 + dt*q2d;

input(i) = u;
theta(i) = q1;
end
plot(theta)