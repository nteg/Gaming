﻿using UnityEngine;
using System.Collections;

public class Rotate : MonoBehaviour {

    public Vector3 speed;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
        transform.Rotate(0, 20 * Time.deltaTime, 0);
    }
}
