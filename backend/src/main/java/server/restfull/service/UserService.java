package server.restfull.service;

import java.util.ArrayList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import server.restfull.model.UserDao;
import server.restfull.repo.UserRepository;
import server.restfull.model.User;

import org.json.simple.JSONArray;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.FileReader;
import java.io.IOException;

@Service
public class UserService implements UserDao {

	private List<User> users = new ArrayList<>();

	public UserService() throws org.json.simple.parser.ParseException {

		this.users.add(new User("1", "Anton", "Mueller", "anton.Mueller@gogole.de"));
		this.users.add(new User("3", "Tao", "Mao", "Tao.Mao@gogole.de"));
		this.users.add(new User("5", "Max", "Bauer", "Max.Bauer@gogole.de"));
	}
//
//	List<User> loadDataFromJsonArray() throws org.json.simple.parser.ParseException {
//		List<User> users = new ArrayList<>();
//		// JSON parser object to parse read file
//		JSONParser jsonParser = new JSONParser();
//
//		try (FileReader reader = new FileReader(
//				this.getClass().getClassLoader().getResource("userlist.json").getFile())) {
//			// Read JSON file
//			Object obj = jsonParser.parse(reader);
//			JSONObject jsonObject = (JSONObject) obj;
//			// extracting data array from json string
//			JSONArray usersArray = (JSONArray) jsonObject.get("users");
//			for (int i = 0; i < usersArray.size(); i++) {
//				JSONObject userItem = (JSONObject) usersArray.get(i);
//
//				System.out.println(String.format("item = %d, %s, - %s - %s, - %s", i, userItem.get("id"),
//						userItem.get("name"), userItem.get("lastname"), userItem.get("email")));
//
//				users.add(new User(userItem.get("id").toString(), userItem.get("name").toString(),
//						userItem.get("lastname").toString(), userItem.get("email").toString()));
//
//			}
//
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		return users;
//	}

	public List<User> findAll() {

		return users;
	}

	public User getUserById(String id) {

		for (int i = 0; i < users.size(); i++) {
			User u = users.get(i);
			if ((u.getId()).equals(id)) {
				return users.get(i);
			}
		}
		return null;
	}

	public void deleteUser(String id) {

		for (int i = 0; i < users.size(); i++) {
			User u = users.get(i);
			if (u.getId().equals(id)) {
				users.remove(i);
				

			}

		}
		

	}

	public void addUser(User user) {
		users.add(user);
		System.out.println(user.toString());

	}

	@Override
	public List<User> getAllUsers() {

		return users;
	}

	public void updateUser(String id, User user) {
		for (int i = 0; i < users.size(); i++) {
			User u = users.get(i);
			if (u.getId().equals(id)) {
				users.set(i, user);
				return;
			}

		}

	}

}
