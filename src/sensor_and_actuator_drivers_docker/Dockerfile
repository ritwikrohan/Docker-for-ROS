# Start from ROS base image
FROM ros:noetic-ros-base

# Install dependencies
RUN apt-get update && apt-get install -y \
    ros-noetic-laser-geometry \
    ros-noetic-laser-proc \
    ros-noetic-urg-node \
    ros-noetic-pointcloud-to-laserscan \
    ros-noetic-usb-cam \
    ros-noetic-imu-tools \
    ros-noetic-robot-localization \
    ros-noetic-joy \
    ros-noetic-dynamixel-sdk

# Make workspace
# WORKDIR /
RUN mkdir -p /catkin_ws/src
WORKDIR /catkin_ws/src
RUN /bin/bash -c '. /opt/ros/noetic/setup.bash; catkin_init_workspace'
RUN /bin/bash -c '. /opt/ros/noetic/setup.bash; cd /catkin_ws; catkin_make'

# Copy motor and encoder drivers here

# Copy LIDAR driver here

# Copy camera driver here

# Copy IMU driver here

# Build workspace
RUN /bin/bash -c '. /opt/ros/noetic/setup.bash; cd /catkin_ws; catkin_make'

# Source ROS setup file
RUN echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc

# Source workspace setup file
RUN echo "source /catkin_ws/devel/setup.bash" >> ~/.bashrc

# Set environment variables
ENV ROS_MASTER_URI=http://localhost:11311/
ENV ROS_HOSTNAME=localhost