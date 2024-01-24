# Start from ROS base image
FROM osrf/ros:noetic-desktop-full-focal

# make workspace
WORKDIR /
RUN mkdir -p /catkin_ws/src
WORKDIR /catkin_ws/src

# install Git
RUN apt-get update && apt-get install -y \
    git

COPY ./ /catkin_ws/src/move_and_turn

# build
WORKDIR /catkin_ws

# Building your ROS packages
RUN /bin/bash -c "source /opt/ros/noetic/setup.bash; cd /catkin_ws; catkin_make"

# Source the workspace every time a new shell is opened in the container
RUN echo source /catkin_ws/devel/setup.bash >> ~/.bashrc

# Set up the Network Configuration
# Example with the ROS_MASTER_URI value set as the one running on the Host System
ENV ROS_MASTER_URI http://1_simulation:11311
        
# Start move_and_turn launch file at container startup
CMD /bin/bash -c "source /catkin_ws/devel/setup.bash; rosrun move_and_turn move_and_turn.py"